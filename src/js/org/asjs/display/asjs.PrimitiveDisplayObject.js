includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );

ASJS.PrimitiveDisplayObject = function( tag ) {
	var that = new ASJS.EventDispatcher( tag );
	
	property( that, "text", {
		get: function() { return that.jQuery.text(); },
		set: function( value ) { that.jQuery.text( value ); }
	});
	
	that.getAttr = function( key ) { return that.jQuery.attr( key ); }
	that.setAttr = function( key, value ) { that.jQuery.attr( key, value ); }
	that.removeAttr = function( key ) { that.jQuery.removeAttr( key ); }
	
	that._sendAddedToStageEvent = function() {}
	
	return that;
};
