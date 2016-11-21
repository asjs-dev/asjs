includeOnce( "org/asjs/display/form/asjs.AbstractTextElement.js" );

ASJS.TextInput = function() {
	var that = new ASJS.AbstractTextElement( "<input />" );
	
	property( that, "type", {
		get: function() { return that.getAttr( "type" ); },
		set: function( value ) { that.setAttr( "type", value ); }
	});
	
	(function() {
		that.type = ASJS.TextInput.TYPE_TEXT;
	})();
	
	return that;
}
ASJS.TextInput.TYPE_TEXT		= "text";
ASJS.TextInput.TYPE_PASSWORD	= "password";
ASJS.TextInput.TYPE_EMAIL		= "email";
ASJS.TextInput.TYPE_NUMBER		= "number";
