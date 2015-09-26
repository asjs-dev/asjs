ASJS.GradientColorData = function( stop, color, alpha ) {
	var that = {};
		that.stop = stop || 0;
		that.color = color || "#0";
		that.alpha = alpha || 1;
	return that;
}
