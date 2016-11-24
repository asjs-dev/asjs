includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

function WS() {
	var that = new ASJS.EventDispatcher();
	
	var _window = new ASJS.Window();
	
	var RECONNECT_INTERVALS = [ 1, 2, 3, 15, 30, 60, 120, 240, 300 ];
	
	var _tryToReconnect;
	var _reconnectCounter = 0;
	var _reconnectTimeoutId;
	var _url;
	var _ws;
	
	property( that, "url", {
		get: function() { return _url; }
	});
	
	property( that, "tryToReconnect", {
		set: function( value ) { _tryToReconnect = value; },
		get: function() { return _tryToReconnect; }
	});
	
	property( that, "isOpen", {
		get: function() { return that.readyState == WS.OPEN; }
	});
	
	property( that, "readyState", {
		get: function() { return _ws ? _ws.readyState : WS.CLOSED; }
	});
	
	property( that, "protocol", {
		get: function() { return _ws ? _ws.protocol : null; }
	});
	
	property( that, "bufferedAmount", {
		get: function() { return _ws ? _ws.bufferedAmount : 0; }
	});
	
	that.connect = function( url ) {
		_url = url;
		
		if ( _ws ) {
			if ( that.isOpen ) _ws.close();
			_ws = null;
		}
		
		_ws = new WebSocket( _url );
		_ws.onopen = onOpen;
		_ws.onclose = onClose;
		_ws.onmessage = onMessage;
		_ws.onerror = onError;
	}
	
	that.send = function( data ) {
		if ( that.isOpen ) _ws.send( data );
	}
	
	that.close = function() {
		if ( that.isOpen ) _ws.close();
	}
	
	function onOpen( e ) {
		_reconnectCounter = 0;
		that.dispatchEvent( WS.ON_OPEN );
	}
	
	function onClose( e ) {
		that.dispatchEvent( WS.ON_CLOSED );
		if ( !e.wasClean && that.tryToReconnect ) {
			_reconnectCounter = Math.min( RECONNECT_INTERVALS.length - 1, _reconnectCounter + 1 );
			var timeout = RECONNECT_INTERVALS[ _reconnectCounter ];
			that.dispatchEvent( WS.ON_RECONNECT, timeout );
			_window.clearTimeout( _reconnectTimeoutId );
			_reconnectTimeoutId = _window.setTimeout( reconnect, timeout * 1000 );
		}
	}
	
	function reconnect() {
		_window.clearTimeout( _reconnectTimeoutId );
		that.connect( _url );
	}
	
	function onMessage( e ) {
		that.dispatchEvent( WS.ON_MESSAGE, e.data );
	}
	
	function onError( e ) {
		that.dispatchEvent( WS.ON_ERROR, e );
	}
	
	return that;
};
WS.CONNECTING	= 0;
WS.OPEN			= 1;
WS.CLOSING		= 2;
WS.CLOSED		= 3;
WS.ON_OPEN		= "WS-onOpen";
WS.ON_CLOSED	= "WS-onClosed";
WS.ON_ERROR		= "WS-onError";
WS.ON_MESSAGE	= "WS-onMessage";
WS.ON_RECONNECT	= "WS-onReconnect";
