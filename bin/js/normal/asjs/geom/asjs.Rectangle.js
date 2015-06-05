includeOnce( "js/normal/asjs/geom/asjs.Point.js" );

ASJS.Rectangle = function( x, y, width, height ) {
	var that = new ASJS.Point( x, y );
	
	that.width = width || 0;
	that.height = height || 0;
	
	return that;
}
