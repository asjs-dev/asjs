includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.TintBitmapFilter = function( r, g, b, a ) {
	var that = new ASJS.AbstractBitmapFilter();
	
	var _r = r || 0;
	var _g = g || 0;
	var _b = b || 0;
	var _a = a || 0;
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		var i = -4;
		var l = d.length;
		while ( ( i += 4 ) < l ) {
			d[ i ] += _r;
			d[ i + 1 ] += _g;
			d[ i + 2 ] += _b;
			d[ i + 3 ] += _a;
		}
		return pixels;
	}
	
	return that;
}
