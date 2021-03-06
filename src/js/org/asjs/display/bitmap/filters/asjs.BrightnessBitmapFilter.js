includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.BrightnessBitmapFilter = function( adjustment ) {
	var that = new ASJS.AbstractBitmapFilter();
	
	var _adjustment = adjustment;
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		var i = -4;
		var l = d.length;
		while ( ( i += 4 ) < l ) {
			d[ i ] += _adjustment;
			d[ i + 1 ] += _adjustment;
			d[ i + 2 ] += _adjustment;
		}
		return pixels;
	}
	
	return that;
}
