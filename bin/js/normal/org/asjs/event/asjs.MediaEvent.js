includeOnce( "org/asjs/event/asjs.Event.js" );

ASJS.MediaEvent = function( type ) {
	var that = new ASJS.Event( type );
	return that;
}
ASJS.MediaEvent.ABORT				= "abort";
ASJS.MediaEvent.CAN_PLAY			= "canplay";
ASJS.MediaEvent.CAN_PLAY_THROUGH	= "canplaythrough";
ASJS.MediaEvent.DURATION_CHANGE		= "durationchange";
ASJS.MediaEvent.EMPTIED				= "emptied";
ASJS.MediaEvent.ENDED				= "ended";
ASJS.MediaEvent.ERROR				= "error";
ASJS.MediaEvent.LOADED_DATA			= "loadeddata";
ASJS.MediaEvent.LOADED_META_DATA	= "loadedmetadata";
ASJS.MediaEvent.LOAD_START			= "loadstart";
ASJS.MediaEvent.PAUSE				= "pause";
ASJS.MediaEvent.PLAY				= "play";
ASJS.MediaEvent.PLAYING				= "playing";
ASJS.MediaEvent.PROGRESS			= "progress";
ASJS.MediaEvent.RATE_CHANGE			= "ratechange";
ASJS.MediaEvent.SEEKED				= "seeked";
ASJS.MediaEvent.SEEKING				= "seeking";
ASJS.MediaEvent.STALLED				= "stalled";
ASJS.MediaEvent.SUSPEND				= "suspend";
ASJS.MediaEvent.TIME_UPDATE			= "timeupdate";
ASJS.MediaEvent.VOLUME_CHANGE		= "volumechange";
ASJS.MediaEvent.WAITING				= "waiting";
