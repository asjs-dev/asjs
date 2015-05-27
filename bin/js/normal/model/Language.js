function Language() {
	function LanguageInstance() {
		var that = {};
		
		var _languageItems = {};
		var _supportedLanguages;
		var _selectedLanguage;
	
		defineProperty( that, "data", {
			get: function() { return _languageItems; },
			set: function( value ) {
				_supportedLanguages = value.supported_languages;
				_selectedLanguage = value.default_language;
				_languageItems = value.elements;
			}
		});
	
		defineProperty( that, "supportedLanguages", {
			get: function() { return _supportedLanguages; }
		});
	
		defineProperty( that, "selectedLanguage", {
			set: function( value ) { _selectedLanguage = value; },
			get: function() { return _selectedLanguage; }
		});
	
		that.getText = function( key ) {
			return _languageItems[ key ] != undefined && _languageItems[ key ][ that.selectedLanguage ] != undefined ? _languageItems[ key ][ that.selectedLanguage ] : "";
		}

		that.genText = function( str ) {
			for ( var key in _languageItems ) str = str.split( "{{" + key + "}}" ).join( that.getText( key ) );
			return str;
		}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Language.$ ) Language.$ = new LanguageInstance();
			return Language.$;
		}
	});
}
