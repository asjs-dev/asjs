includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.SepiaFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function() {
		return "sepia(" + value + ")";
	}
	
	return that;
}
