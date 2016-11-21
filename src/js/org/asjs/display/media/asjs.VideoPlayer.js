includeOnce( "org/asjs/display/media/asjs.AbstractMediaPlayer.js" );

ASJS.VideoPlayer = function() {
	var that = new ASJS.AbstractMediaPlayer( "<video />" );
	
	property( that, "poster", {
		get: function() { return that.el.poster; },
		set: function( value ) { that.el.poster = value; }
	});
	
	return that;
}
