function Config() {
	function ConfigInstance() {
		var that = {};
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Config.$ ) Config.$ = new ConfigInstance();
			return Config.$;
		}
	});
}
