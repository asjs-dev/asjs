includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.BrightnessFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function() {
		return "brightness(" + value + "%)";
	}
	
	return that;
}
