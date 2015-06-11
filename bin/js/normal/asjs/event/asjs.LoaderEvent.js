includeOnce( "js/normal/asjs/event/asjs.Event.js" );

ASJS.LoaderEvent = function( type ) {
	var that = new ASJS.Event( type );
	
	that.loaded = 0;
	that.total = 0;
	
	return that;
}
ASJS.LoaderEvent.LOAD		= "load";
ASJS.LoaderEvent.ERROR		= "error";
ASJS.LoaderEvent.ABORT		= "abort";
ASJS.LoaderEvent.LOAD_START	= "loadstart";
ASJS.LoaderEvent.PROGRESS	= "progress";
ASJS.LoaderEvent.LOAD_END	= "loadend";
