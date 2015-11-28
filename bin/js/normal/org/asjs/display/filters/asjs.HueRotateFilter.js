includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.HueRotateFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function() {
		return "hue-rotate(" + value + "deg)";
	}
	
	return that;
}
