includeOnce( "org/asjs/mvc/asjs.NotificationDispatcher.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );

function Facebook() {
	function FacebookInstance() {
		var that = new ASJS.NotificationDispatcher();
		var _fbRoot = new ASJS.Sprite();
	
		that.init = function( facebookAppId ) {
			var e = document.createElement( 'script' ); 
			e.async = true;
			e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';        
			document.getElementById( 'fb-root' ).appendChild( e );
		
			window.fbAsyncInit = function() {
				FB.init({ appId: facebookAppId, status: true, cookie: true, xfbml: true, oauth: true });
				FB.getLoginStatus( onLoginStatus );
			};
		}
	
		that.login = function() {
			FB.login( function( response ) {
				onLoginStatus( response );
			});
		}
	
		that.logout = function() {
			FB.getLoginStatus( function( response ) {
				if ( response.status == "connected" ) {
					FB.logout( function( response ) {
						that.sendNotification( Facebook.LOGOUT );
					});
				} else that.sendNotification( Facebook.LOGOUT );
			});
		}
	
		that.postToFeed = function( title, desc, url, imageUrl ) {
			var obj = { method: 'feed', link: url, picture: imageUrl, name: title, description: desc };
			function postFeedCallback( response ) {
				that.sendNotification( Facebook.POST_COMPLETE, response );
			}
			FB.ui( obj, postFeedCallback );
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
