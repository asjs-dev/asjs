includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );
includeOnce( "org/asjs/geom/asjs.Point.js" );

ASJS.MaskBitmapFilter = function( mask, pos, invert, cutout ) {
	var that = new ASJS.AbstractBitmapFilter();
	
	var _mask = mask;
	var _pos = pos;
	var _invert = invert;
	var _cutout = cutout == undefined ? true : cutout;
	
	that.execute = function( pixels ) {
		var srcD = pixels.data;
		var maskPixels = mask.getImageData( 0, 0, mask.bitmapWidth, mask.bitmapHeight );
		
		var maskD = maskPixels.data;

		var srcW = pixels.width;

		var maskW = maskPixels.width;
		var maskH = maskPixels.height;

		var maxMaskW = _pos.x + maskW;
		var maxMaskH = _pos.y + maskH;

		var i = -4;
		var l = srcD.length;
		while ( ( i += 4 ) < l ) {
			var srcPixelLinearPos = Math.floor( i / 4 );
			var srcPixelPos = new ASJS.Point(
				Math.floor( srcPixelLinearPos % srcW ),
				Math.floor( srcPixelLinearPos / srcW )
			);
			if ( srcPixelPos.x >= _pos.x && srcPixelPos.y >= _pos.y && srcPixelPos.x < maxMaskW && srcPixelPos.y < maxMaskH ) {
				var j = ( ( srcPixelPos.y - _pos.y ) * maskW + ( srcPixelPos.x - _pos.x ) ) * 4;
				var sA = srcD[ i + 3 ];
				var mA = maskD[ j + 3 ];
				
				srcD[ i + 3 ] = Math.floor( sA * ( ( _invert ? ( 255 - mA ) : mA ) / 255 ) );
			} else if ( _cutout ) srcD[ i + 3 ] = 0;
		}
	
		return pixels;
	}

	return that;
}
