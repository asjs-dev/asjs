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
