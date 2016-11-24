includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );
includeOnce( "com/asjs/model/Config.js" );
includeOnce( "com/asjs/model/proxy/DataProxy.js" );

function ConfigLoaderCommand() {
	var that = new ASJS.AbstractCommand();
	
	var _config		= new Config();
	var _dataProxy	= new DataProxy();
	
	that.execute = function() {
		var dfd = _dataProxy.loadJSON( "json/config.json" );
			dfd.done( loadComplete );
		
		return dfd;
	}
	
	function loadComplete( response ) {
		_config.data = response;
	}
	
	return that;
}
