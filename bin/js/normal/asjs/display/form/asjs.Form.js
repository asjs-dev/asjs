includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );

ASJS.Form = function() {
	var that = new ASJS.Sprite( "<form />" );
	
	defineProperty( that, "action", {
		get: function() { return that.getAttr( "action" ); },
		set: function( value ) { that.setAttr( "action", value ); }
	});
	
	defineProperty( that, "method", {
		get: function() { return that.getAttr( "method" ); },
		set: function( value ) { that.setAttr( "method", value ); }
	});
	
	defineProperty( that, "enctype", {
		get: function() { return that.getAttr( "enctype" ); },
		set: function( value ) { that.setAttr( "enctype", value ); }
	});
	
	that.reset = function() {
		that.domElement.reset();
	}
	
	return that;
};
ASJS.Form.ENCTYPE_MULTIPART	= "multipart/form-data";
