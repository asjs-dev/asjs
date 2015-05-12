includeOnce( "js/normal/asjs/geom/asjs.Point.js" );

ASJS.Rectangle = function( tx, ty, twidth, theight ) {
	var that = new ASJS.Point( tx, ty );
	var _width = twidth || 0;
	var _height = theight || 0;
	
	defineProperty( that, "width", {
		get: function() { return _width; },
		set: function( value ) { _width = value; }
	});
	
	defineProperty( that, "height", {
		get: function() { return _height; },
		set: function( value ) { _height = value; }
	});
	
	return that;
}
