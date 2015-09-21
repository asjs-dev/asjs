function Config() {
	function ConfigInstance() {
		var that = {};
		
		var _data = {};
		
		defineProperty( that, "data", {
			get: function() { return _data; },
			set: function( value ) { _data = value }
		});
		
		that.get = function( key ) {
			return _data && _data[ key ] ? _data[ key ] : null;
		}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Config.$ ) Config.$ = new ConfigInstance();
			return Config.$;
		}
	});
}
