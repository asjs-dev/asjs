includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.InvertBitmapFilter = function() {
	var that = new ASJS.AbstractBitmapFilter();
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		var i;
		var l = d.length;
		for ( i = 0; i < l; i += 4 ) {
			d[ i ] = 128 - ( d[ i ] - 128 );
			d[ i + 1 ] = 128 - ( d[ i + 1 ] - 128 );
			d[ i + 2 ] = 128 - ( d[ i + 2 ] - 128 );
		}
		return pixels;
	}
	
	return that;
}
