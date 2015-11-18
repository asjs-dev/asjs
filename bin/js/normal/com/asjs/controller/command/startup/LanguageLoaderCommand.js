includeOnce( "com/asjs/controller/command/startup/AbstractLoaderCommand.js" );
includeOnce( "com/asjs/model/Language.js" );

function LanguageLoaderCommand() {
	var that = new AbstractLoaderCommand();
	
	var _language = new Language().instance;
	var _dfd;
	
	that.execute = function() {
		_dfd = $.Deferred();
		
		that.load( "json/language.json" ).done( loadComplete );
		
		return _dfd.promise();
	}
	
	function loadComplete( response ) {
		_language.data = response;
		_dfd.resolve();
	}
	
	return that;
}
