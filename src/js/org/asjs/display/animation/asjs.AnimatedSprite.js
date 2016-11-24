includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/display/asjs.Image.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );
includeOnce( "org/asjs/utils/asjs.Cycler.js" );

ASJS.AnimatedSprite = function() {
	var that = new ASJS.DisplayObject();
	
	var _cycler	= new ASJS.Cycler();

	var _animations			= {};
	var _isPlaying			= false;
	var _selectedAnimation	= "";
	var _step				= 0;
	var _angle				= ASJS.AnimatedSprite.PLAY_NORMAL;
	
	property( that, "selectedAnimation", { get: function() { return _selectedAnimation; } } );
	
	that.addAnimationDescriptorList = function( animationDescriptorList ) {
		var i = -1;
		var l = animationDescriptorList.length;
		while ( ++i < l ) that.addAnimationDescriptor( animationDescriptorList[ i ] );
	}
	
	that.addAnimationDescriptor = function( animationDescriptor ) {
		_animations[ animationDescriptor.name ] = animationDescriptor;
	}
	
	that.removeAnimationDescriptor = function( name ) {
		_animations[ name ] = null;
		delete _animations[ name ];
	}
	
	that.stop = function() {
		_step = 0;
		_isPlaying = false;
		_cycler.removeCallback( update );
	}
	
	that.play = function( name, type ) {
		if ( !_animations[ name ] ) return;
		
		var angle = !type ? ASJS.AnimatedSprite.PLAY_NORMAL : ( type == ASJS.AnimatedSprite.PLAY_NORMAL ? ASJS.AnimatedSprite.PLAY_NORMAL : ASJS.AnimatedSprite.PLAY_REVERSE );
		if ( _selectedAnimation == name && _angle == angle ) {
			letsPlay();
			return;
		}
		
		_selectedAnimation = name;
		_angle = angle;
		
		_step = 0;
		var spriteSheet = _animations[ _selectedAnimation ].spriteSheet;
		if ( spriteSheet != "" ) {
			var image = new ASJS.Image();
				image.addEventListener( ASJS.LoaderEvent.LOAD, function() {
					that.setCSS( "background-image", "url(" + spriteSheet + ")" );
					letsPlay();
				});
				image.addEventListener( ASJS.LoaderEvent.ERROR, function() {
					trace( "Error: missing animation sprite sheet" );
				});
				image.src = spriteSheet;
		} else letsPlay();
	}
	
	function letsPlay() {
		if ( _isPlaying ) return;
		_isPlaying = true;
		_cycler.addCallback( update );
	}
	
	function update() {
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
		
		if ( _angle == ASJS.AnimatedSprite.PLAY_NORMAL ) {
			_step++;
			if ( _step >= sequenceList.length ) _step = 0;
		} else {
			_step--;
			if ( _step < 0 ) _step = sequenceList.length - 1;
		}
	}
	
	(function() {
		that.stop();
	})();
	
	return that;
}
ASJS.AnimatedSprite.PLAY_NORMAL		= "ASJS-AnimatedSprite-playNormal";
ASJS.AnimatedSprite.PLAY_REVERSE	= "ASJS-AnimatedSprite-playReverse";
