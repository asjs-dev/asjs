includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.ContrastFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function() {
		return "contrast(" + value + ")";
	}
	
	return that;
}
