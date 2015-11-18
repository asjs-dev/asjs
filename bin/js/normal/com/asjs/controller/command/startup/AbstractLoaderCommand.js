includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );
includeOnce( "org/asjs/net/asjs.Loader.js" );
includeOnce( "org/asjs/net/asjs.RequestMethod.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );

function AbstractLoaderCommand() {
	var that = new ASJS.AbstractCommand();
	
	var _dfd;
	var _loader;
	
	that.load = function( url ) {
		_dfd = $.Deferred();
		
		_loader = new ASJS.Loader();
		_loader.requestType = ASJS.RequestMethod.GET;
		_loader.addEventListener( ASJS.LoaderEvent.LOAD_END, onLoadEnd );
		_loader.addEventListener( ASJS.LoaderEvent.ERROR, onLoadError );
		_loader.load( url );
		
		return _dfd.promise();
	}
	
	function onLoadEnd( event ) {
		_loader.removeEventListeners();
		_dfd.resolve( _loader.content );
	}
	
	function onLoadError( event ) {
		_loader.removeEventListeners();
		throw new Error( "Missing: " + _loader.url );
		_dfd.reject();
	}
	
	return that;
}
