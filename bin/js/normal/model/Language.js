includeOnce( "js/normal/Tools.js" );
includeOnce( "js/normal/model/Cookies.js" );

function Language() {
	function LanguageInstance() {
		var that = {};
		
		var _tools = new Tools().instance;
		var _cookies = new Cookies().instance;
		
		var _languageItems = {};
		var _supportedLanguages = [ 'en' ];
		var _defaultLanguage = _supportedLanguages[ 0 ];
		var _selectedLanguage;
	
		defineProperty( that, "data", {
			get: function() { return _languageItems; },
			set: function( value ) { _languageItems = value; }
		});
	
		defineProperty( that, "supportedLanguages", {
			get: function() { return _supportedLanguages; }
		});
	
		defineProperty( that, "selectedLanguage", {
			get: function() {
				if ( !_selectedLanguage ) {
					_selectedLanguage = _tools.getURLParams( 'lang' );
					if ( _selectedLanguage == undefined || _supportedLanguages.indexOf( _selectedLanguage ) == -1 ) _selectedLanguage =_cookies.readCookie( 'language' );
					if ( _selectedLanguage == undefined || _supportedLanguages.indexOf( _selectedLanguage ) == -1 ) _selectedLanguage = _defaultLanguage;
				}
				return _selectedLanguage;
			},
			set: function( value ) { _selectedLanguage = value; }
		});
	
		that.getText = function( key ) {
			return _languageItems[ key ] != undefined && _languageItems[ key ][ that.selectedLanguage ] != undefined ? _languageItems[ key ][ that.selectedLanguage ] : "";
		}

		that.genText = function( str ) {
			for ( var key in _languageItems ) str = str.split( "{{" + key + "}}" ).join( that.getText( key ) );
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
