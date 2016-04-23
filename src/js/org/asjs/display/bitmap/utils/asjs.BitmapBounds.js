includeOnce( "org/asjs/geom/asjs.Point.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );

ASJS.BitmapBounds = {};
ASJS.BitmapBounds.execute = function( bitmap ) {
	var pixels = bitmap.getImageData( 0, 0, bitmap.bitmapWidth, bitmap.bitmapHeight );
	
	var d = pixels.data;
	var w = pixels.width;
	
	var size = new ASJS.Rectangle( pixels.width, pixels.height, 0, 0 );
	
	var i = -4;
	var l = d.length;
	while ( ( i += 4 ) < l ) {
		if ( d[ i + 3 ] > 0 ) {
			var pixelLinearPos = Math.floor( i / 4 );
			var pixelPos = new ASJS.Point(
				Math.floor( pixelLinearPos % w ),
				Math.floor( pixelLinearPos / w )
			);
			
			if ( pixelPos.x < size.x ) size.x = pixelPos.x;
			if ( pixelPos.y < size.y ) size.y = pixelPos.y;
			
			if ( pixelPos.x - size.x + 1 > size.width ) size.width = pixelPos.x - size.x + 1;
			if ( pixelPos.y - size.y + 1 > size.height ) size.height = pixelPos.y - size.y + 1;
		}
	}
	
	return size;
}
