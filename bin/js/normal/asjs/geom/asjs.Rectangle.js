includeOnce( "js/normal/asjs/geom/asjs.Point.js" );

ASJS.Rectangle = function( tx, ty, twidth, theight ) {
	var that = new ASJS.Point( tx, ty );
	
	that.width = twidth || 0;
	that.height = theight || 0;
	
	return that;
}
