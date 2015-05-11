includeOnce( "js/normal/asjs/asjs.AbstractTextElement.js" );

ASJS.TextInput = function() {
	var that = new ASJS.AbstractTextElement( "<input />" );
	
	defineProperty( that, "type", {
		get: function() {
			var response = ASJS.TextInput.TYPE_TEXT;
			switch ( that.getAttr( "type" ) ) {
				case "password": response = ASJS.TextInput.TYPE_PASSWORD;
				break;
				case "email": response = ASJS.TextInput.TYPE_EMAIL;
				break;
				default: response = ASJS.TextInput.TYPE_TEXT;
				break;
			}
			return response;
		},
		set: function( value ) {
			switch ( value ) {
				case ASJS.TextInput.TYPE_PASSWORD: that.setAttr( "type", "password" );
				break;
				case ASJS.TextInput.TYPE_EMAIL: that.setAttr( "type", "email" );
				break;
				default: that.setAttr( "type", "text" );
				break;
			}
		}
	});
	
	(function() {
		that.type = ASJS.TextInput.TYPE_TEXT;
	})();
	
	return that;
}
ASJS.TextInput.TYPE_TEXT		= "TextInput-typeText";
ASJS.TextInput.TYPE_PASSWORD	= "TextInput-typePassword";
ASJS.TextInput.TYPE_EMAIL		= "TextInput-typeEmail";
