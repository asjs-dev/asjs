includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.DropShadowFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function() {
		return "drop-shadow(" + value + ")";
	}
	
	return that;
}
