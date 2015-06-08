includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );

ASJS.VideoPlayer = function() {
	var that = new ASJS.DisplayObject( "<video />" );
	
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
	
	(function() {
		that.setAttr( "controls", "true" );
		that.setAttr( "preload", "true" );
	})();
	
	return that;
}
