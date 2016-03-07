includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.DropShadowFilter = function( value ) {
	var that = new ASJS.AbstractFilter( value );
	
	that.execute = function( h, v, blur, spread, color ) {
		return "drop-shadow(" + h + "px " + v + "px " + blur + "px " + spread + "px " + color + ")";
	}
	
	return that;
}
