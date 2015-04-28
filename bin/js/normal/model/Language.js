function Language() {
	function LanguageInstance() {
		var that = {};
		var _language = {};
		var _supportedLanguages = [ 'en' ];
		var _defaultLanguage = _supportedLanguages[ 0 ];
		var _selectedLanguage;
	
		defineProperty( that, "data", {
			get: function() { return _language; },
			set: function( value ) { _language = value; }
		});
	
		defineProperty( that, "supportedLanguages", {
			get: function() { return _supportedLanguages; }
		});
	
		defineProperty( that, "selectedLanguage", {
			get: function() {
				if ( !_selectedLanguage ) {
					_selectedLanguage = Tools.$.getURLParams( 'lang' );
					if ( _selectedLanguage == undefined || _supportedLanguages.indexOf( _selectedLanguage ) == -1 ) _selectedLanguage = Tools.$.readCookie( 'language' );
					if ( _selectedLanguage == undefined || _supportedLanguages.indexOf( _selectedLanguage ) == -1 ) _selectedLanguage = _defaultLanguage;
				}
				return _selectedLanguage;
			},
			set: function( value ) { _selectedLanguage = value; }
		});
	
		that.getText = function( key ) {
			return _language[ key ] != undefined && _language[ key ][ that.selectedLanguage ] != undefined ? _language[ key ][ that.selectedLanguage ] : "";
		}

		that.genText = function( str ) {
			for ( var key in _language ) str = str.split( "{{" + key + "}}" ).join( that.getText( key ) );
			return str;
		}
	
		/* CONSTRUCTOR */{}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Language.$ ) Language.$ = new LanguageInstance();
			return Language.$;
		}
	});
}
