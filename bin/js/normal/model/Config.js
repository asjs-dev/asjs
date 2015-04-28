function Config() {
	function ConfigInstance() {
		var that = {};
	
		/* CONSTRUCTOR */{}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Config.$ ) Config.$ = new ConfigInstance();
			return Config.$;
		}
	});
}
