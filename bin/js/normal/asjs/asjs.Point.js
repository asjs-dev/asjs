ASJS.Point = function( tx, ty ) {
	var that = {};
	var _x = tx || 0;
	var _y = ty || 0;
	
	defineProperty( that, "x", {
		get: function() { return _x; },
		set: function( value ) { _x = value; }
	});
	
	defineProperty( that, "y", {
		get: function() { return _y; },
		set: function( value ) { _y = value; }
	});
	
	/* CONSTRUCTOR */{}
	
	return that;
}
