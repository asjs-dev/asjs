includeOnce( "org/asjs/event/asjs.Event.js" );

ASJS.WindowEvent = function( type ) {
	var that = new ASJS.Event( type );
	return that;
}
ASJS.WindowEvent.POPSTATE	= "popstate";
ASJS.WindowEvent.RESIZE		= "resize";
ASJS.WindowEvent.ONLINE		= "online";
ASJS.WindowEvent.OFFLINE	= "offline";
