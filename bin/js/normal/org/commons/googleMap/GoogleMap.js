includeOnce( "org/asjs/display/asjs.Sprite.js" );

function GoogleMap() {
	var that = new ASJS.Sprite( "<p />");
	
	var _map;
	var _latitude = 0;
	var _longitude = 0;
	var _zoom = 4;
	var _options = {};
	
	defineProperty( that, "map", {
		get: function() { return _map; }
	});
	
	defineProperty( that, "options", {
		get: function() { return _options; },
		set: function( value ) { _options = value; }
	});
	
	defineProperty( that, "latitude", {
		get: function() { return _latitude; },
		set: function( value ) {
			_latitude = value;
			_map.setCenter( that.latLng );
		}
	});
	
	defineProperty( that, "longitude", {
		get: function() { return _longitude; },
		set: function( value ) {
			_longitude = value;
			_map.setCenter( that.latLng );
		}
	});
	
	defineProperty( that, "latLng", {
		get: function() { return new google.maps.LatLng( that.latitude, that.longitude ); }
	});
	
	defineProperty( that, "zoom", {
		get: function() { return _zoom; },
		set: function( value ) {
			_zoom = value;
			_map.setZoom( _zoom );
		}
	});
	
	that.setPosition = function( latitude, longitude ) {
		that.latitude = lat;
		that.longitude = lng;
		_map.panTo( that.latLng );
	}
	
	that.init = function() {
		google.maps.visualRefresh = true;
		_map = new google.maps.Map( that.domElement, that.options );
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
