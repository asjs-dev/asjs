includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.IFrame = function() {
	var that = new ASJS.DisplayObject( "<iframe />" );
	
	property( that, "src", {
		get: function() { return that.getAttr( "src" ); },
		set: function( value ) { that.setAttr( "src", value ); }
	});
	
	return that;
};
