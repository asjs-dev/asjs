includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );
includeOnce( "org/asjs/event/asjs.WindowEvent.js" );

ASJS.Window = function() {
	return singleton( ASJS.Window, function() {
		var that = new ASJS.EventDispatcher( window );
		
		var _browserStatus;
		var _requestAnimationFrame;
		
		property( that, "isOnline", { get: function() { return _browserStatus == ASJS.WindowEvent.ONLINE; } } );
		property( that, "width", { get: function() { return that.jQuery.width(); } } );
		property( that, "height", { get: function() { return that.jQuery.height(); } } );
		property( that, "screen", { get: function() { return that.el.screen; } } );
		property( that, "screenTop", { get: function() { return that.screen.availTop; } } );
		property( that, "screenLeft", { get: function() { return that.screen.availLeft; } } );
		property( that, "screenWidth", { get: function() { return that.screen.width; } } );
		property( that, "screenHeight", { get: function() { return that.screen.height; } } );
		property( that, "screenAvailWidth", { get: function() { return that.screen.availWidth; } } );
		property( that, "screenAvailHeight", { get: function() { return that.screen.availHeight; } } );
		
		property( that, "scrollTop", {
			get: function() { return that.jQuery.scrollTop(); },
			set: function( value ) { that.jQuery.scrollTop( value ); }
		});
		
		property( that, "scrollLeft", {
			get: function() { return that.jQuery.scrollLeft(); },
			set: function( value ) { that.jQuery.scrollLeft( value ); }
		});
		
		property( that, "location", {
			get: function() { return that.el.location; },
			set: function( value ) { that.el.location = value; }
		});
		
		property( that, "navigator", { get: function() { return that.el.navigator || navigator; }});
		
		property( that, "audioContext", { get: function() { return that.el.AudioContext || that.el.webkitAudioContext; } } );
		
		property( that, "userMedia", { get: function() {
			return that.navigator.getUserMedia || that.navigator.webkitGetUserMedia || that.navigator.msGetUserMedia || that.navigator.mozGetUserMedia;
		}});
		
		property( that, "devicePixelRatio", { get: function() { return that.el.devicePixelRatio; } } );
		
		that.setTimeout = function( callback, duration ) {
			return that.el.setTimeout( function() {
				that.requestAnimationFrame( callback );
			}, duration );
		}
		
		that.clearTimeout = function( id ) {
			return that.el.clearTimeout( id );
		}
		
		that.setInterval = function( callback, duration ) {
			return that.el.setInterval( function() {
				that.requestAnimationFrame( callback );
			}, duration );
		}
		
		that.clearInterval = function( id ) {
			return that.el.clearInterval( id );
		}
		
		that.requestAnimationFrame = function( callback ) {
			_requestAnimationFrame( callback );
		}
		
		(function() {
			_requestAnimationFrame = that.el.requestAnimationFrame
				|| that.el.mozRequestAnimationFrame
				|| that.el.webkitRequestAnimationFrame
				|| that.el.msRequestAnimationFrame
				|| function( f ) { return setTimeout( f, 1 ) };
			
			_browserStatus = that.navigator.onLine ? ASJS.WindowEvent.ONLINE : ASJS.WindowEvent.OFFLINE;
			that.addEventListener( ASJS.WindowEvent.ONLINE + " " + ASJS.WindowEvent.OFFLINE, function( e ) {
				_browserStatus = e.type;
			});
		})();
		
		return that;
	});
};
