includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.AnimatedSprite = function() {
	var that = new ASJS.DisplayObject();

	var _animations = {};
	var _isPlaying = false;
	var _selectedAnimation = "";
	var _step = 0;
	
	defineProperty( that, "selectedAnimation", { get: function() { return _selectedAnimation; } } );
	
	that.addAnimationDescriptorList = function( animationDescriptorList ) {
		var i;
		var l = animationDescriptorList.length;
		for ( i = 0; i < l; i++ ) that.addAnimationDescriptor( animationDescriptorList[ i ] );
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
		
		var selectedAnimation = _animations[ _selectedAnimation ];
		var sequenceList = selectedAnimation.sequenceList;
		
		var rect = sequenceList[ _step ];
		var size = selectedAnimation.size;
		
		var percentW = that.width / rect.width;
		var percentH = that.height / rect.height;
		
		that.setCSS( "background-position", ( - rect.x * percentW ) + "px " + ( - rect.y * percentH ) + "px" );
		that.setCSS( "background-size", ( size.x * percentW ) + "px " + ( size.y * percentH ) + "px" );
		that.setSize( rect.width * percentW, rect.height * percentH );
		
		_step++;
		if ( _step >= sequenceList.length ) _step = 0;
	}
	
	return that;
}