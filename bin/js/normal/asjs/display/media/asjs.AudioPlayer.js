includeOnce( "js/normal/asjs/display/media/asjs.AbstractMediaPlayer.js" );

ASJS.AudioPlayer = function() {
	var that = new ASJS.AbstractMediaPlayer( "<audio />" );
	return that;
}
