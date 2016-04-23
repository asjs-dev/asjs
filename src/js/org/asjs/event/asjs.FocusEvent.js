includeOnce( "org/asjs/event/asjs.Event.js" );

ASJS.FocusEvent = function( type ) {
	var that = new ASJS.Event( type );
	return that;
}
ASJS.FocusEvent.FOCUS	= "focus";
ASJS.FocusEvent.BLUR	= "blur";
