includeOnce( "js/normal/asjs/event/asjs.Event.js" );

ASJS.KeyboardEvent = function( type ) {
	var that = new ASJS.Event( type );
	return that;
}
ASJS.KeyboardEvent.KEY_UP		= "keyup";
ASJS.KeyboardEvent.KEY_DOWN		= "keydown";
ASJS.KeyboardEvent.KEY_PRESS	= "keypress";
