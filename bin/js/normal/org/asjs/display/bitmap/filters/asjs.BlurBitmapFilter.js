includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractConvoluteBitmapFilter.js" );

ASJS.BlurBitmapFilter = function( value ) {
	var that = new ASJS.AbstractConvoluteBitmapFilter();
	
	var _blurValue = Math.max( 1, value || 1 );
	
	defineProperty( that, "_matrix", {
		get: function() {
			var value = 1 / Math.pow( _blurValue, 2 );
			var matrix = [];
			var i = -1;
			while ( ++i < _blurValue ) {
				var j = -1;
				while ( ++j < _blurValue ) {
					matrix.push( value );
				}
			}
			return matrix;
		}
	});
	
	return that;
}
