includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.InvertFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function() {
		return "invert(" + value + ")";
	}
	
	return that;
}
