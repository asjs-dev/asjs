includeOnce( "js/normal/asjs/asjs.DisplayObject.js" );

ASJS.VideoPlayer = function() {
	var that = new ASJS.DisplayObject( "<video />" );
	
	that.setAttr( "controls", "true" );
	that.setAttr( "preload", "true" );
	
	defineProperty( that, "autoplay", {
		get: function() { return that.getAttr( "autoplay" ); },
		set: function( value ) { that.setAttr( "autoplay", value ); }
	});
	
	defineProperty( that, "streamUrl", {
		get: function() { return _streamUrl; },
		set: function( value ) {
			_streamUrl = value;
			that.setAttr( "src", _streamUrl );
		}
	});
	
	/* CONSTRUCTOR */ {}
	
	return that;
}
