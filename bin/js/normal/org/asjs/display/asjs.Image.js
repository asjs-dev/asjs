includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.Image = function() {
	var that = new ASJS.DisplayObject( "<img />" );
	
	var _filters = {};
	
	var _saturate = 0;
	var _grayscale = 0;
	var _contrast = 0;
	var _brightness = 0;
	var _blur = 0;
	var _invert = 0;
	var _sepia = 0;
	var _hueRotate = 0;
	var _opacity = 0;
	
	defineProperty( _filters, "saturate", {
		get: function() { return _saturate; },
		set: function( value ) {
			_saturate = value;
			setFilter( "saturate(" + _saturate + ")" );
		}
	});
	
	defineProperty( _filters, "grayscale", {
		get: function() { return _grayscale; },
		set: function( value ) {
			_grayscale = value;
			setFilter( "grayscale(" + _grayscale + "%)" );
		}
	});
	
	defineProperty( _filters, "contrast", {
		get: function() { return _contrast; },
		set: function( value ) {
			_contrast = value;
			setFilter( "contrast(" + _grayscale + "%)" );
		}
	});
	
	defineProperty( _filters, "brightness", {
		get: function() { return _brightness; },
		set: function( value ) {
			_brightness = value;
			setFilter( "brightness(" + _brightness + ")" );
		}
	});
	
	defineProperty( _filters, "blur", {
		get: function() { return _blur; },
		set: function( value ) {
			_blur = value;
			setFilter( "blur(" + _blur + "px)" );
		}
	});
	
	defineProperty( _filters, "invert", {
		get: function() { return _invert; },
		set: function( value ) {
			_invert = value;
			setFilter( "invert(" + _invert + "%)" );
		}
	});
	
	defineProperty( _filters, "sepia", {
		get: function() { return _sepia; },
		set: function( value ) {
			_sepia = value;
			setFilter( "sepia(" + _sepia + "%)" );
		}
	});
	
	defineProperty( _filters, "hueRotate", {
		get: function() { return _hueRotate; },
		set: function( value ) {
			_hueRotate = value;
			setFilter( "hue-rotate(" + _hueRotate + "deg)" );
		}
	});
	
	defineProperty( _filters, "opacity", {
		get: function() { return _opacity; },
		set: function( value ) {
			_opacity = value;
			setFilter( "opacity(" + _opacity + "%)" );
		}
	});
	
	defineProperty( that, "filters", { get: function() { return _filters; } } );
	
	defineProperty( that, "src", {
		get: function() { return that.getAttr( "src" ); },
		set: function( value ) { that.setAttr( "src", value ); }
	});
	
	defineProperty( that, "alt", {
		get: function() { return that.getAttr( "alt" ); },
		set: function( value ) { that.setAttr( "alt", value ); }
	});
	
	defineProperty( that, "title", {
		get: function() { return that.getAttr( "title" ); },
		set: function( value ) { that.setAttr( "title", value ); }
	});
	
	function setFilter( value ) {
		that.setCSS( "-webkit-filter", value );
		that.setCSS( "filter", value );
	}
	
	return that;
}
