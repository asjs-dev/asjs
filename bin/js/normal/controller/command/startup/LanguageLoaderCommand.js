includeOnce( "js/normal/controller/command/startup/AbstractLoaderCommand.js" );
includeOnce( "js/normal/model/Language.js" );

function LanguageLoaderCommand() {
	var that = new AbstractLoaderCommand();
	
	var _language = new Language().instance;
	
	that.execute = function() {
		var dfd = $.Deferred();
		
		that.load( "json/language.json" ).done( function( response ) {
			_language.data = response;
			dfd.resolve();
		});
		
		return dfd.promise();
	}
	
	return that;
}
