includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );
includeOnce( "org/asjs/display/bitmap/asjs.Bitmap.js" );

ASJS.AbstractConvoluteBitmapFilter = function( opaque ) {
	var that = new ASJS.AbstractBitmapFilter();
	
	var _opaque = opaque;
	
	defineProperty( that, "matrix", {
		get: function() {
			return [
				0, 0, 0,
				0, 0, 0,
				0, 0, 0
			];
		}
	});
	
	that.execute = function( pixels ) {
		var d = pixels.data;
		return convolute( pixels );
	}
	
	function convolute( pixels ) {
		var weights = that.matrix;
		var side = Math.round( Math.sqrt( weights.length ) );
		var halfSide = Math.floor( side * 0.5 );
		
		var src = pixels.data;
		var sw = pixels.width;
		var sh = pixels.height;
		
		var w = sw;
		var h = sh;
		
		var bitmapHelper = new ASJS.Bitmap( w, h );
		var output = bitmapHelper.getImageData( 0, 0, w, h );
		var dst = output.data;
		
		var alphaFac = _opaque ? 1 : 0;
		
		var y;
		var x;
		var sy = y;
		var sx = x;
		var dstOff = ( y * w + x ) * 4;
		
		var r;
		var g;
		var b;
		var a;
		var cy;
		var cx;
		var scy;
		var scx;
		var srcOff;
		var wt;
					
		for ( y = 0; y < h; y++ ) {
			for ( x = 0; x < w; x++ ) {
				sy = y;
				sx = x;
				dstOff = ( y * w + x ) * 4;
				
				r = 0;
				g = 0;
				b = 0;
				a = 0;
				for ( cy = 0; cy < side; cy++ ) {
					for ( cx = 0; cx < side; cx++ ) {
						scy = sy + cy - halfSide;
						scx = sx + cx - halfSide;
						if ( scy >= 0 && scy < sh && scx >= 0 && scx < sw ) {
							srcOff = ( scy * sw + scx ) * 4;
							wt = weights[ cy * side + cx ];
							r += src[ srcOff ] * wt;
							g += src[ srcOff + 1 ] * wt;
							b += src[ srcOff + 2 ] * wt;
							a += src[ srcOff + 3 ] * wt;
						}
					}
				}
				dst[ dstOff ] = r;
				dst[ dstOff + 1 ] = g;
				dst[ dstOff + 2 ] = b;
				dst[ dstOff + 3 ] = a + alphaFac * ( 255 - a );
			}
		}
		return output;
	};
	
	return that;
}
