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
		
		that.set = function( key, value ) {
			_data[ key ] = value;
		}
		
		that.merge = function( data ) {
			merge( _data, data );
		}
		
		function merge( originalData, newData ) {
			var newKey;
			for ( newKey in newData ) {
				if ( typeof originalData[ newKey ] == "object" ) merge( originalData[ newKey ], newData[ newKey ] );
				else originalData[ newKey ] = newData[ newKey ];
			}
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
