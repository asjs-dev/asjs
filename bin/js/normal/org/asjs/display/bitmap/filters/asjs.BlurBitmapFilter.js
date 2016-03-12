includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractConvoluteBitmapFilter.js" );

ASJS.BlurBitmapFilter = function( value ) {
	var that = new ASJS.AbstractConvoluteBitmapFilter();
	
	var _blurValue = Math.max( 1, value || 1 );
	
	defineProperty( that, "matrix", {
		get: function() {
			var value = 1 / Math.pow( _blurValue, 2 );
			var matrix = [];
			var i;
			var j;
			for ( i = 0; i < _blurValue; i++ ) {
				for ( j = 0; j < _blurValue; j++ ) {
					matrix.push( value );
				}
			}
			return matrix;
		}
	});
	
	return that;
}
