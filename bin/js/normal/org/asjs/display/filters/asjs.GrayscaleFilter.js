includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.GrayscaleFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function() {
		return "grayscale(" + value + "%)";
	}
	
	return that;
}
