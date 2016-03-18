includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.AlphaBitmapFilter = function( type ) {
	var that = new ASJS.AbstractBitmapFilter();
	
	var _type = type == ASJS.AlphaBitmapFilter.TYPE_DARKNESS;
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		var i = -4;
		var l = d.length;
		while ( ( i += 4 ) < l ) {
			var average = ( ( d[ i ] + d[ i + 1 ] + d[ i + 2 ] ) / 3 );
			var a = Math.round( _type ? 255 - average : average );
			d[ i + 3 ] -= a;
		}
		return pixels;
	}
	
	return that;
}
ASJS.AlphaBitmapFilter.TYPE_DARKNESS	= "ASJS-AlphaBitmapFilter-typeDarkness";
ASJS.AlphaBitmapFilter.TYPE_BRIGHTNESS	= "ASJS-AlphaBitmapFilter-typeBrightness";
