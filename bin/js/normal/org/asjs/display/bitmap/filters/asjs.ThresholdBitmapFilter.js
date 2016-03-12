includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.ThresholdBitmapFilter = function( threshold ) {
	var that = new ASJS.AbstractBitmapFilter();
	
	var _threshold = threshold;
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		var i;
		var l = d.length;
		var r;
		var g;
		var b;
		var v;
		for ( i = 0; i < l; i += 4 ) {
			r = d[ i ];
			g = d[ i + 1 ];
			b = d[ i + 2 ];
			v = ( 0.2126 * r + 0.7152 * g + 0.0722 * b >= _threshold ) ? 255 : 0;
			d[ i ] = d[ i + 1 ] = d[ i + 2 ] = v;
		}
		return pixels;
	}
	
	return that;
}
