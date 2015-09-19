function Config() {
	function ConfigInstance() {
		var that = {};
		
		var _data = {};
		
		defineProperty( that, "data", {
			get: function() { return _data; },
			set: function( value ) { _data = value }
		});
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Config.$ ) Config.$ = new ConfigInstance();
			return Config.$;
		}
	});
}
