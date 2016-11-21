includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractConvoluteBitmapFilter.js" );

ASJS.SharpenBitmapFilter = function() {
	var that = new ASJS.AbstractConvoluteBitmapFilter();
	
	property( that, "_matrix", {
		get: function() {
			return [
				0, -1, 0,
				-1, 5, -1,
				0, -1, 0
			];
		}
	});
	
	return that;
}
