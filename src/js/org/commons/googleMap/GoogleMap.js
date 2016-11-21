includeOnce( "org/asjs/display/asjs.Sprite.js" );

function GoogleMap() {
	var that = new ASJS.Sprite( "<p />");
	
	var _map;
	var _latitude = 0;
	var _longitude = 0;
	var _zoom = 4;
	var _options = {};
	
	property( that, "map", {
		get: function() { return _map; }
	});
	
	property( that, "options", {
		get: function() { return _options; },
		set: function( value ) { _options = value; }
	});
	
	property( that, "latitude", {
		get: function() { return _latitude; },
		set: function( value ) {
			_latitude = value;
			_map.panTo( that.latLng );
		}
	});
	
	property( that, "longitude", {
		get: function() { return _longitude; },
		set: function( value ) {
			_longitude = value;
			_map.panTo( that.latLng );
		}
	});
	
	property( that, "latLng", {
		get: function() { return new google.maps.LatLng( that.latitude, that.longitude ); }
	});
	
	property( that, "zoom", {
		get: function() { return _zoom; },
		set: function( value ) {
			_zoom = value;
			_map.setZoom( _zoom );
		}
	});
	
	that.setPosition = function( latitude, longitude ) {
		_latitude = latitude;
		_longitude = longitude;
		_map.panTo( that.latLng );
	}
	
	that.init = function() {
		google.maps.visualRefresh = true;
		_map = new google.maps.Map( that.el, that.options );
		_map.addListener( 'center_changed', onCenterChanged );
	}
	
	that.destruct = function() {
		google.maps.event.clearListeners( _map, 'center_changed' );
		_map = null;
	}
	
	function onCenterChanged() {
		var latLng = _map.getCenter();
		_latitude = latLng.lat();
		_longitude = latLng.lng();
	}
	
	(function() {
		that.options = {
			center: that.latLng,
			zoom: that.zoom,
			mapTypeControlOptions: {
				mapTypeIds: []
			},
			zoomControl: true,
			disableDefaultUI: true,
			zoomControlOptions: {},
			panControl: false,
			scaleControl: false,
			streetViewControl: false,
			draggable: true
		};
	})();
	
	return that;
}
GoogleMap.CLICK =	"GoogleMap-click";
