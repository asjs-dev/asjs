includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/proxy/DataProxy.js" );

function LanguageLoaderCommand() {
	var that = new ASJS.AbstractCommand();
	
	var _language	= new Language();
	var _dataProxy	= new DataProxy();
	
	that.execute = function() {
		var dfd = _dataProxy.loadJSON( "json/language.json" );
			dfd.done( loadComplete );
		
		return dfd;
	}
	
	function loadComplete( response ) {
		_language.data = response;
	}
	
	return that;
}
