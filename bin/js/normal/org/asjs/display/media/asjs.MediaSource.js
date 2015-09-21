includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.MediaSource = function() {
	var that = new ASJS.DisplayObject( "<source />" );
	
	defineProperty( that, "type", {
		get: function() { return that.getAttr( "type" ); },
		set: function( value ) { that.setAttr( "type", value ); }
	});
	
	defineProperty( that, "src", {
		get: function() { return that.getAttr( "src" ); },
		set: function( value ) { that.setAttr( "src", value ); }
	});
	
	return that;
}
ASJS.MediaSource.TYPE_AUDIO_MP3		= "audio/mpeg";
ASJS.MediaSource.TYPE_AUDIO_OGG		= "audio/ogg";
ASJS.MediaSource.TYPE_AUDIO_WAV		= "audio/wav";
ASJS.MediaSource.TYPE_VIDEO_MP4		= "video/mp4";
ASJS.MediaSource.TYPE_VIDEO_OGG		= "video/ogg";
ASJS.MediaSource.TYPE_VIDEO_WEBM	= "video/webm";
