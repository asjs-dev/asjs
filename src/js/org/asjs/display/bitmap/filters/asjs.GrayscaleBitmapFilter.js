includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.GrayscaleBitmapFilter = function() {
	var that = new ASJS.AbstractBitmapFilter();
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		var i = -4;
		var l = d.length;
		while ( ( i += 4 ) < l ) {
			var r = d[ i ];
			var g = d[ i + 1 ];
			var b = d[ i + 2 ];
			var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
			d[ i ] = d[ i + 1 ] = d[ i + 2 ] = v;
		}
		return pixels;
	}
	
	return that;
}
