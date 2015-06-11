includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );
includeOnce( "js/normal/asjs/event/asjs.LoaderEvent.js" );

ASJS.Loader = function() {
	var that = new ASJS.DisplayObject();
	
	var _request = new XMLHttpRequest();

	that.load = function( url ) {
		_request.onloadstart = onLoadStart;
		_request.onprogress = onProgress;
		_request.onload = onLoad;
		_request.onloadend = onLoadEnd;
		_request.onerror = onError;
		_request.overrideMimeType( 'text/plain; charset=x-user-defined' );
		_request.withCredentials = true;
		_request.open( "GET", url, true );
		_request.send( null );
	}
	
	function onLoadStart( event ) {
		dispatch( ASJS.LoaderEvent.LOAD_START, event );
	}
	
	function onProgress( event ) {
		if ( event.lengthComputable ) dispatch( ASJS.LoaderEvent.PROGRESS, event );
	}
	
	function onLoad( event ) {
		dispatch( ASJS.LoaderEvent.LOAD, event );
	}
	
	function onLoadEnd( event ) {
		dispatch( ASJS.LoaderEvent.LOAD_END, event );
	}
	
	function onError( event ) {
		dispatch( ASJS.LoaderEvent.ERROR, event );
	}
	
	function dispatch( type, event ) {
		var e = new ASJS.LoaderEvent( ASJS.LoaderEvent.LOAD_END );
			e.loaded = event.loaded;
			e.total = event.total;
		that.dispatchEvent( e );
	}
	
	return that;
}
