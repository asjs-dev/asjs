ASJS.GeomUtils = function() {
	var that = {};
	
	that.pointInOrigo = function( point ) {
		return point.x == 0 && point.y == 0;
	}
	
	that.twoPointDistance = function( pointA, pointB ) {
		return Math.sqrt( Math.pow( pointB.x - pointA.x, 2 ) + Math.pow( pointB.y - pointA.y, 2 ) );
	}
	
	that.twoPointDistance = function( pointA, pointB ) {
		return Math.sqrt( Math.pow( pointB.x - pointA.x, 2 ) + Math.pow( pointB.y - pointA.y, 2 ) );
	}
	
	that.pointInRect = function( point, rect ) {
		return point.x >= rect.x && point.x <= rectangle.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
	}
	
	that.twoPointEquals = function( pointA, pointB ) {
		return pointA.x == pointB.x && pointA.y == pointB.y;
	}
	
	that.rectInRect = function( rectA, rectB ) {
		return rectA.x >= rectB.x && rectA.y == rectB.y && rectA.x + rectA.width <= rectB.x + rectB.width && rectA.y + rectA.height <= rectB.y + rectB.height;
	}
	
	return that;
}
