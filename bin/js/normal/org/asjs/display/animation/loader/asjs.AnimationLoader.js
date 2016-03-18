includeOnce( "org/asjs/net/asjs.Loader.js" );
includeOnce( "org/asjs/net/asjs.RequestMethod.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );

includeOnce( "org/asjs/display/animation/asjs.AnimatedSprite.js" );
includeOnce( "org/asjs/display/animation/asjs.AnimationDescriptor.js" );

includeOnce( "org/asjs/geom/asjs.Rectangle.js" );
includeOnce( "org/asjs/geom/asjs.Point.js" );

ASJS.AnimationLoader = function() {
	var that = {};
	
	var _dfd;
	var _loader;
	
	that.load = function( url ) {
		_dfd = $.Deferred();
		
		_loader = new ASJS.Loader();
		_loader.requestType = ASJS.RequestMethod.GET;
		_loader.addEventListener( ASJS.LoaderEvent.LOAD_END, onLoadEnd );
		_loader.addEventListener( ASJS.LoaderEvent.ERROR, onLoadError );
		_loader.load( url );
		
		return _dfd.promise();
	}
	
	function parseAnimationDescriptor( data ) {
		var i = -1;
		var l = data.frames.length;
		var frames = [];
		while ( ++i < l ) {
			var frame = data.frames[ i ];
			frames.push( new ASJS.Rectangle( frame.x, frame.y, frame.w, frame.h ) );
		}
		
		return new ASJS.AnimationDescriptor(
			data.id, 
			data.image, 
			new ASJS.Point( data.imageSize.w, data.imageSize.h ), 
			frames
		);
	}
	
	function onLoadEnd( event ) {
		_loader.removeEventListeners();
		
		try {
			var i = -1;
			var l = _loader.content.length;
			var animationDescriptorList = [];
			while ( ++i < l ) animationDescriptorList.push( parseAnimationDescriptor( _loader.content[ i ] ) );
			
			var animatedSprite = new ASJS.AnimatedSprite();
				animatedSprite.addAnimationDescriptorList( animationDescriptorList );
			
			_dfd.resolve( animatedSprite );
		} catch ( e ) {
			throw new Error( "Invalid animation descriptor file: " + _loader.url );
			_dfd.reject();
		}
	}
	
	function onLoadError( event ) {
		_loader.removeEventListeners();
		throw new Error( "Missing: " + _loader.url );
		_dfd.reject();
	}
	
	return that;
}
