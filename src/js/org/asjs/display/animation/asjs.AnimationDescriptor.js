includeOnce( "org/asjs/geom/asjs.Point.js" );

ASJS.AnimationDescriptor = function( name, spriteSheet, size, frameDelay, sequenceList ) {
	var that = {};
	
	var _name			= name || "";
	var _spriteSheet	= spriteSheet || "";
	var _size			= size || new ASJS.Point();
	var _frameDelay		= Math.floor( Math.max( 1, frameDelay || 1 ) );
	var _sequenceList	= sequenceList || [];
	
	property( that, "name", {
		get: function() { return _name; },
		set: function( value ) { _name = value; }
	});
	
	property( that, "sequenceList", {
		get: function() { return _sequenceList; },
		set: function( value ) { _sequenceList = value; }
	});
	
	property( that, "frameDelay", {
		get: function() { return _frameDelay; },
		set: function( value ) { _frameDelay = value; }
	});
	
	property( that, "size", {
		get: function() { return _size; },
		set: function( value ) { _size = value; }
	});
	
	property( that, "spriteSheet", {
		get: function() { return _spriteSheet; },
		set: function( value ) { _spriteSheet = value; }
	});
	
	return that;
}
