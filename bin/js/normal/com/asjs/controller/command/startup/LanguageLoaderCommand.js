includeOnce( "com/asjs/controller/command/startup/AbstractLoaderCommand.js" );
includeOnce( "com/asjs/model/Language.js" );

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
