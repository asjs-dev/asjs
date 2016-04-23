includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.OpacityBitmapFilter = function( adjustment ) {
	var that = new ASJS.AbstractBitmapFilter();
	
	var _adjustment = adjustment || 1;
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		var i = -4;
		var l = d.length;
		while ( ( i += 4 ) < l ) {
			d[ i + 3 ] *= _adjustment;
		}
		return pixels;
	}
	
	return that;
}
