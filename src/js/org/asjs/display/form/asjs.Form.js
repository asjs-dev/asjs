includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.Form = function() {
	var that = new ASJS.Sprite( "<form />" );
	
	property( that, "action", {
		get: function() { return that.getAttr( "action" ); },
		set: function( value ) { that.setAttr( "action", value ); }
	});
	
	property( that, "method", {
		get: function() { return that.getAttr( "method" ); },
		set: function( value ) { that.setAttr( "method", value ); }
	});
	
	property( that, "enctype", {
		get: function() { return that.getAttr( "enctype" ); },
		set: function( value ) { that.setAttr( "enctype", value ); }
	});
	
	that.reset = function() {
		that.el.reset();
	}
	
	that.submit = function() {
		that.el.submit();
	}
	
	return that;
};
ASJS.Form.ENCTYPE_MULTIPART	= "multipart/form-data";
