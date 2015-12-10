includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );

ASJS.PrimitiveDisplayObject = function( domElement ) {
	var that = new ASJS.EventDispatcher( domElement );
	
	defineProperty( that, "text", {
		get: function() { return that.domObject.text(); },
		set: function( value ) { that.domObject.text( value ); }
	});
	
	defineProperty( that, "domElement", { get: function() { return that.domObject[ 0 ]; } } );
	
	that.getAttr = function( key ) { return that.domObject.attr( key ); }
	that.setAttr = function( key, value ) { that.domObject.attr( key, value ); }
	that.removeAttr = function( key ) { that.domObject.removeAttr( key ); }
	
	that._sendAddedToStageEvent = function() {}
	
	that.domObject = $( domElement || "<div />" );
	
	return that;
};
