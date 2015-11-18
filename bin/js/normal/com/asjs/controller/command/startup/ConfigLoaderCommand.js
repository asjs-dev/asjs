includeOnce( "com/asjs/controller/command/startup/AbstractLoaderCommand.js" );
includeOnce( "com/asjs/model/Config.js" );

function ConfigLoaderCommand() {
	var that = new AbstractLoaderCommand();
	
	var _config = new Config().instance;
	var _dfd;
	
	that.execute = function() {
		_dfd = $.Deferred();
		
		that.load( "json/config.json" ).done( loadComplete );
		
		return _dfd.promise();
	}
	
	function loadComplete( response ) {
		_config.data = response;
		_dfd.resolve();
	}
	
	return that;
}
