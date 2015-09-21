includeOnce( "com/asjs/controller/command/startup/AbstractLoaderCommand.js" );
includeOnce( "com/asjs/model/Config.js" );

function ConfigLoaderCommand() {
	var that = new AbstractLoaderCommand();
	
	var _config = new Config().instance;
	
	that.execute = function() {
		var dfd = $.Deferred();
		
		that.load( "json/config.json" ).done( function( response ) {
			_config.data = response;
			dfd.resolve();
		});
		
		return dfd.promise();
	}
	
	return that;
}
