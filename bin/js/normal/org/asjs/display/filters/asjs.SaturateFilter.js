includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.SaturateFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function() {
		return "saturate(" + value + ")";
	}
	
	return that;
}
