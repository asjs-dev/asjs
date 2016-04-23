includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.CutoutBitmapFilter = function( adjustment ) {
	var that = new ASJS.AbstractBitmapFilter();
	
	var _adjustment = adjustment || 255;
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		var average = 255 / _adjustment;
		var i = -4;
		var l = d.length;
		while ( ( i += 4 ) < l ) {
			d[ i ] = Math.floor( d[ i ] / average ) * average;
			d[ i + 1 ] = Math.floor( d[ i + 1 ] / average ) * average;
			d[ i + 2 ] = Math.floor( d[ i + 2 ] / average ) * average;
		}
		return pixels;
	}
	
	return that;
}
