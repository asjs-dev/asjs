includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.ContrastBitmapFilter = function( adjustment ) {
	var that = new ASJS.AbstractBitmapFilter();
	
	var _adjustment = adjustment || 1;
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		var i = -4;
		var l = d.length;
		while ( ( i += 4 ) < l ) {
			d[ i ] = 128 - ( ( 128 - d[ i ] ) * _adjustment );
			d[ i + 1 ] = 128 - ( ( 128 - d[ i + 1 ] ) * _adjustment );
			d[ i + 2 ] = 128 - ( ( 128 - d[ i + 2 ] ) * _adjustment );
		}
		return pixels;
	}
	
	return that;
}
