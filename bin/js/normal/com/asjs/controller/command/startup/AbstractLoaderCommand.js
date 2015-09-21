includeOnce( "com/asjs/controller/command/AbstractCommand.js" );
includeOnce( "org/asjs/net/asjs.Loader.js" );
includeOnce( "org/asjs/net/asjs.RequestMethod.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );

function AbstractLoaderCommand() {
	var that = new AbstractCommand();
	
	that.load = function( url ) {
		var dfd = $.Deferred();
		
		var loader = new ASJS.Loader();
			loader.requestType = ASJS.RequestMethod.GET;
			loader.addEventListener( ASJS.LoaderEvent.LOAD_END, function( event ) {
				loader.removeEventListeners();
				dfd.resolve( loader.content );
			});
			loader.addEventListener( ASJS.LoaderEvent.ERROR, function( event ) {
				loader.removeEventListeners();
				throw new Error( "Missing: " + loader.url );
				dfd.reject();
			});
			loader.load( url );
		
		return dfd.promise();
	}
	
	return that;
}
