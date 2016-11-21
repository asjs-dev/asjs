includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );

ASJS.AbstractModel = function() {
	var that = new ASJS.EventDispatcher();
	
	var _listenerPrefix = "ASJS-AbstractModel-";
	var _data = {};
	
	property( that, "data", {
		get: function() { return _data; },
		set: function( value ) {
			_data = value;
			that.dispatchEvent( ASJS.AbstractModel.CHANGED );
		}
	});
	
	that.get = function( key ) {
		return _data && _data[ key ] ? _data[ key ] : null;
	}
	
	that.set = function( key, value ) {
		if ( !_data ) _data = {};
		var o = _data[ key ];
		_data[ key ] = value;
		that.dispatchEvent( ASJS.AbstractModel.CHANGED );
		that.dispatchEvent( _listenerPrefix + key, [ o, value ] );
	}
	
	that.clear = function() {
		_data = null;
		that.dispatchEvent( ASJS.AbstractModel.CLEARED );
	}
	
	that.watch = function( key, listener ) {
		that.addEventListener( _listenerPrefix + key, listener );
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
ASJS.AbstractModel.CHANGED	= "ASJS-AbstractModel-changed";
ASJS.AbstractModel.CLEARED	= "ASJS-AbstractModel-cleared";
