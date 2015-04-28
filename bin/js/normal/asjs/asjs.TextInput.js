includeOnce( "js/normal/asjs/asjs.AbstractTextElement.js" );

ASJS.TextInput = function() {
	var that = new ASJS.AbstractTextElement( "<input />" );
	
	defineProperty( that, "password", {
		get: function() { return that.getAttr( "type" ) == "password"; },
		set: function( value ) { that.setAttr( "type", value ? "password" : "text" ); }
	});
	
	defineProperty( that, "email", {
		get: function() { return that.getAttr( "type" ) == "email"; },
		set: function( value ) { that.setAttr( "type", value ? "email" : "text" ); }
	});
	
	/* CONSTRUCTOR */{
		that.setAttr( "type", "text" );
	}
	
	return that;
}
