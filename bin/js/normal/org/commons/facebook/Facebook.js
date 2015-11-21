includeOnce( "org/asjs/mvc/asjs.NotificationDispatcher.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );

function Facebook() {
	function FacebookInstance() {
		var that = new ASJS.NotificationDispatcher();
		
		var _fbRoot = new ASJS.Sprite();
	
		that.init = function( facebookAppId, version ) {
			var e = document.createElement( 'script' ); 
			e.async = true;
			e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';        
			document.getElementById( 'fb-root' ).appendChild( e );
			
			window.fbAsyncInit = onFBAsyncInit;
		}
	
		that.login = function() {
			FB.login( onLoginStatus );
		}
	
		that.logout = function() {
			FB.getLoginStatus( onGetLoginStatus );
		}
	
		that.postToFeed = function( title, desc, url, imageUrl ) {
			var obj = {
				method: 'feed',
				link: url,
				picture: imageUrl,
				name: title,
				description: desc
			};
			FB.ui( obj, onPostFeed );
		}
		
		function onPostFeed( response ) {
			that.sendNotification( Facebook.POST_COMPLETE, response );
		}
		
		function onLogout( response ) {
			that.sendNotification( Facebook.LOGOUT );
		}
		
		function onGetLoginStatus( response ) {
			if ( response.status == "connected" ) FB.logout(  onLogout );
			else that.sendNotification( Facebook.LOGOUT );
		}
		
		function onFBAsyncInit() {
			var obj = {
				appId: facebookAppId,
				status: true,
				cookie: true,
				xfbml: true,
				oauth: true,
				version: ( version || 'v2.4' )
			};
			FB.init( obj );
			FB.getLoginStatus( onLoginStatus );
		}
		
		function onLoginStatus( response ) {
			switch ( response.status ) {
				case "connected": that.sendNotification( Facebook.CONNECTED, response.authResponse );
				break;
				case "not_authorized": that.sendNotification( Facebook.NOT_AUTHORIZED );
				break;
				case "unknown": that.sendNotification( Facebook.UNKNOW );
				break;
			}
		}
	
		(function() {
			_fbRoot.setAttr( "id", "fb-root" );
			stage.addChild( _fbRoot );
		})();
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Facebook.$ ) Facebook.$ = new FacebookInstance();
			return Facebook.$;
		}
	});
};
Facebook.CONNECTED		= "Facebook-connected";
Facebook.NOT_AUTHORIZED	= "Facebook-notAuthorized";
Facebook.UNKNOW			= "Facebook-unknow";
Facebook.LOGOUT			= "Facebook-logout";
Facebook.POST_COMPLETE	= "Facebook-postComplete";
