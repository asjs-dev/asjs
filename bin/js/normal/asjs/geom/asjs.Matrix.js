includeOnce( "js/normal/asjs/geom/asjs.Point.js" );

ASJS.Matrix = function( a, b, c, d, e, f ) {
	var that = {};
	
	that.a = a || 1;
	that.b = b || 0;
	that.c = c || 0;
	that.d = d || 1;
	that.e = e || 0;
	that.f = f || 0;
	
	that.translate = function( tx, ty ) {
		matrix.e = tx;
		matrix.f = ty;
	}
	
	that.skew = function( sx, sy ) {
		matrix.b = sx;
		matrix.c = sy;
	}
	
	that.scale = function( sw, sh ) {
		matrix.a = sw;
		matrix.d = sh;
	}
	
	return that;
}
