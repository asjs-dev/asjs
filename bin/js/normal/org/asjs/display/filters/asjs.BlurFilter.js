includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.BlurFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function() {
		return "blur(" + value + ")";
	}
	
	return that;
}
