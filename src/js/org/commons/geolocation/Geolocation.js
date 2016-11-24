includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );
includeOnce( "org/commons/geolocation/GeolocationData.js" );

Geolocation = function() {
	return singleton( Geolocation, function() {
		var that = new ASJS.EventDispatcher();
		
		var _window = new ASJS.Window();
	
		var _geolocation;
		var _watchID;
		var _location = new GeolocationData();
	
		property( that, "location", { get: function() { return _location;} } );
		
		that.start = function( enableHighAccuracy, timeout, maximumAge ) {
			that.stop();
			if ( !_geolocation ) _geolocation = getGeolocation();
			
			if ( _geolocation ) {
				var obj = {
					'enableHighAccuracy': enableHighAccuracy || false,
					'timeout': timeout || 10000,
					'maximumAge': maximumAge || 60000
				}
				_watchID = _geolocation.watchPosition( setGeoDatas, errorGettingPosition, obj );
			} else errorGettingPosition( { code: "not_supported" } );
		}
		
		that.stop = function() {
			if ( _geolocation && _watchID ) _geolocation.clearWatch( _watchID );
		}
	
		that.isSupported = function() {
			return getGeolocation() != null;
		}
	
		function getGeolocation() {
			return _window.navigator.geolocation || null;
		}
	
		function setGeoDatas( position ) {
			_location = new GeolocationData( position.coords );
		
			that.dispatchEvent( Geolocation.UPDATED, _location );
		}

		function errorGettingPosition( error ) {
			that.dispatchEvent( Geolocation.ERROR, error );
		}
	
		return that;
	});
};
Geolocation.UPDATED	= "Geolocation-updated";
Geolocation.ERROR	= "Geolocation-error";
