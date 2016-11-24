includeOnce( "org/asjs/mvc/model/asjs.AbstractModel.js" );

function Language() {
	return singleton( Language, function() {
		var that = new ASJS.AbstractModel();
		var _super = {};
		
		var _languageItems = {};
		var _supportedLanguages;
		var _selectedLanguage;
	
		extendProperty( _super, that, "data" );
		property( that, "data", {
			set: function( value ) {
				_super.data = value.elements;
				_supportedLanguages = value.supported_languages;
				_selectedLanguage = value.default_language;
			}
		});
	
		property( that, "supportedLanguages", {
			get: function() { return _supportedLanguages; }
		});
	
		property( that, "selectedLanguage", {
			set: function( value ) { _selectedLanguage = value; },
			get: function() { return _selectedLanguage; }
		});
	
		that.getText = function( key ) {
			var i = that.get( key );
			return i != null && i[ that.selectedLanguage ] != undefined ? i[ that.selectedLanguage ] : "";
		}

		that.genText = function( str ) {
			for ( var key in that.data ) str = str.split( "{{" + key + "}}" ).join( that.getText( key ) );
			return str;
		}
		
		return that;
	});
}
