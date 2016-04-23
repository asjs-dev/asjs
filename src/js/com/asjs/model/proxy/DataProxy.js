includeOnce( "com/asjs/services/JSONLoader.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );
includeOnce( "org/asjs/net/asjs.RequestMethod.js" );
includeOnce( "org/asjs/display/animation/loader/asjs.AnimationLoader.js" );

function DataProxy() {
	function DataProxyInstance() {
		var that = {};
		
		that.loadJSON = function( url ) {
			var dfd = new $.Deferred();
			
			var loader = new JSONLoader();
				loader.requestType = ASJS.RequestMethod.GET;
				loader.addEventListener( ASJS.LoaderEvent.LOAD, function( e ) {
					dfd.resolve( loader.content );
				});
				loader.addEventListener( ASJS.LoaderEvent.ERROR, function( e ) {
					dfd.reject( loader.content );
				});
				loader.load( url );
			
			return dfd.promise();
		}
		
		that.loadAnimation = function( url ) {
			var animationLoader = new ASJS.AnimationLoader();
			return animationLoader.load( url );
		}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !DataProxy.$ ) DataProxy.$ = new DataProxyInstance();
			return DataProxy.$;
		}
	});
}
