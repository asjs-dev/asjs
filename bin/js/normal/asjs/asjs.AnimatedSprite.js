includeOnce( "js/normal/asjs/asjs.DisplayObject.js" );
includeOnce( "js/normal/asjs/asjs.Rectangle.js" );
includeOnce( "js/normal/asjs/asjs.Point.js" );

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
	
	/* CONSTRUCTOR */ {}
	
	return that;
}

ASJS.AnimatedSprite = function() {
	var that = new ASJS.DisplayObject();

	var _animations = {};
	var _isPlaying = false;
	var _selectedAnimation = "";
	var _step = 0;
	
	that.addAnimationDescriptorList = function( animationDescriptorList ) {
		var i;
		for ( i = 0; i < animationDescriptorList.length; i++ ) that.addAnimationDescriptor( animationDescriptorList[ i ] );
	}
	
	that.addAnimationDescriptor = function( animationDescriptor ) {
		_animations[ animationDescriptor.name ] = animationDescriptor;
	}
	
	that.removeAnimationDescriptor = function( name ) {
		_animations[ name ] = null;
		delete _animations[ name ];
	}
	
	that.play = function( name ) {
		if ( !_animations[ name ] ) return;
		_selectedAnimation = name;
		_step = 0;
		that.setCSS( "background-image", "url(" + _animations[ _selectedAnimation ].spriteSheet + ")" );
		_isPlaying = true;
	}
	
	that.stop = function() {
		_isPlaying = false;
	}
	
	that.update = function() {
		if ( !_isPlaying ) return;
		
		var rect = _animations[ _selectedAnimation ].sequenceList[ _step ];
		var size = _animations[ _selectedAnimation ].size;
		
		var percentW = that.width / rect.width;
		var percentH = that.height / rect.height;
		
		that.setCSS( "background-position", ( - rect.x * percentW ) + "px " + ( - rect.y * percentH ) + "px" );
		that.setCSS( "background-size", ( size.x * percentW ) + "px " + ( size.y * percentH ) + "px" );
		that.setSize( rect.width * percentW, rect.height * percentH );
		
		_step++;
		if ( _step >= _animations[ _selectedAnimation ].sequenceList.length ) _step = 0;
	}
	
	/* CONSTRUCTOR */ {}
	
	return that;
}
