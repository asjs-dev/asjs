includeOnce( "js/normal/asjs/asjs.NotificationDispatcher.js" );

ASJS.GeolocationData = function() {
	var that = {};
	that.latitude =			0;
	that.longitude =		0;
	that.altitude =			0;
	that.accuracy =			0;
	that.altitudeAccuracy =	0;
	that.heading =			0;
	that.speed =			0;
	return that;
}

ASJS.Geolocation = function() {
	var that = new ASJS.NotificationDispatcher();
	var _geolocation;
	var _watchID;
	var _location = new ASJS.GeolocationData();
	
	that.init = function( enableHighAccuracy, timeout, maximumAge) {
		if ( _geolocation && _watchID ) _geolocation.clearWatch( _watchID );
	
		_geolocation = getGeolocation();
		if ( _geolocation ) {
			_watchID = _geolocation.watchPosition( 
				function( position ) {
					setGeoDatas( position );
				},
				function( error ) {
					errorGettingPosition( error );
				},
				{
					'enableHighAccuracy': enableHighAccuracy || false,
					'timeout': timeout || 10000,
					'maximumAge': maximumAge || 60000
				}
			);
		} else throw new Error( "Geolocation: Not Supported" );
	}
	
	that.isSupported = function() {
		return getGeolocation() != null;
	}
	
	function getGeolocation() {
		var geolocation = window.navigator.geolocation;
		if ( !geolocation ) geolocation = navigator.geolocation;
		if ( !geolocation ) return null;
		return geolocation;
	}
	
	function setGeoDatas( position ) {
		_location.latitude			= position.coords.latitude || 0;
		_location.longitude			= position.coords.longitude || 0;
		_location.altitude			= position.coords.altitude || 0;
		_location.accuracy			= position.coords.accuracy || 0;
		_location.altitudeAccuracy	= position.coords.altitudeAccuracy || 0;
		_location.heading			= position.coords.heading || 0;
		_location.speed				= position.coords.speed || 0;
		
		that.sendNotification( ASJS.Geolocation.UPDATE, _location );
	}

	function errorGettingPosition( error ) {
		that.sendNotification( ASJS.Geolocation.ERROR, error );
	}
	
	/* CONSTRUCTOR */{}
	
	return that;
};
ASJS.Geolocation.UPDATE	= "Geolocation-update";
ASJS.Geolocation.ERROR	= "Geolocation-error";
