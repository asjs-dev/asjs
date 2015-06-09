includeOnce( "js/normal/asjs/display/media/asjs.AbstractMediaPlayer.js" );

ASJS.VideoPlayer = function() {
	var that = new ASJS.AbstractMediaPlayer( "<video />" );
	
	defineProperty( that, "poster", {
		get: function() { return that.domElement.poster; },
		set: function( value ) { that.domElement.poster = value; }
	});
	
	return that;
}
