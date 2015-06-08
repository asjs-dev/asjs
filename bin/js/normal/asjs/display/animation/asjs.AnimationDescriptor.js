includeOnce( "js/normal/asjs/geom/asjs.Point.js" );

ASJS.AnimationDescriptor = function( name, spriteSheet, size, sequenceList ) {
	var that = {};
	
	var _name = name || "";
	var _spriteSheet = spriteSheet || "";
	var _size = size || new ASJS.Point();
	var _sequenceList = sequenceList || [];
	
	defineProperty( that, "name", {
		get: function() { return _name; },
		set: function( value ) { _name = value; }
	});
	
	defineProperty( that, "sequenceList", {
		get: function() { return _sequenceList; },
		set: function( value ) { _sequenceList = value; }
	});
	
	defineProperty( that, "size", {
		get: function() { return _size; },
		set: function( value ) { _size = value; }
	});
	
	defineProperty( that, "spriteSheet", {
		get: function() { return _spriteSheet; },
		set: function( value ) { _spriteSheet = value; }
	});
	
	return that;
}
