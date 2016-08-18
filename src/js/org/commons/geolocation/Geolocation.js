GeolocationData = function( data ) {
	var that = {};
	
	var _data = data || {};
	
	that.latitude			= _data.latitude || 0;
	that.longitude			= _data.longitude || 0;
	that.altitude			= _data.altitude || 0;
	that.accuracy			= _data.accuracy || 0;
	that.altitudeAccuracy	= _data.altitudeAccuracy || 0;
	that.heading			= _data.heading || 0;
	that.speed				= _data.speed || 0;
	
	return that;
}

Geolocation = function() {
	function GeolocationInstance() {
		var that = new ASJS.EventDispatcher();
	
		var _geolocation;
		var _watchID;
		var _location = new GeolocationData();
	
		defineProperty( that, "location", { get: function() { return _location;} } );
		
		that.init = function( enableHighAccuracy, timeout, maximumAge ) {
			if ( _geolocation && _watchID ) _geolocation.clearWatch( _watchID );
	
			_geolocation = getGeolocation();
			if ( _geolocation ) {
				var obj = {
					'enableHighAccuracy': enableHighAccuracy || false,
					'timeout': timeout || 10000,
					'maximumAge': maximumAge || 60000
				}
				_watchID = _geolocation.watchPosition( setGeoDatas, errorGettingPosition, obj );
			} else throw new Error( "Geolocation: Not Supported" );
		}
	
		that.isSupported = function() {
			return getGeolocation() != null;
		}
	
		function getGeolocation() {
			var geolocation = stage.window.navigator.geolocation;
			if ( !geolocation ) geolocation = navigator.geolocation;
			if ( !geolocation ) return null;
			return geolocation;
		}
	
		function setGeoDatas( position ) {
			_location = new GeolocationData( position.coords );
		
			that.dispatchEvent( Geolocation.UPDATED, _location );
		}

		function errorGettingPosition( error ) {
			that.dispatchEvent( Geolocation.ERROR, error );
		}
	
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Geolocation.$ ) Geolocation.$ = new GeolocationInstance();
			return Geolocation.$;
		}
	});
};
Geolocation.UPDATED	= "Geolocation-updated";
Geolocation.ERROR	= "Geolocation-error";
