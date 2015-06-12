includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );
includeOnce( "js/normal/asjs/event/asjs.LoaderEvent.js" );

ASJS.Loader = function() {
	var that = new ASJS.DisplayObject();
	
	var _data;
	var _requestType;
	var _dataType;
	var _content;
	
	defineProperty( that, "data", {
		get: function() { return _data; },
		set: function( value ) { _data = value; }
	});

	defineProperty( that, "requestType", {
		get: function() { return _requestType; },
		set: function( value ) { _requestType = value; }
	});
	
	defineProperty( that, "dataType", {
		get: function() { return _dataType; },
		set: function( value ) { _dataType = value; }
	});
	
	defineProperty( that, "content", {
		get: function() { return _content; }
	});
	
	that.load = function( url ) {
		var requestData = {
			type: _requestType,
			url: url,
			dataType: _dataType,
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				xhr.addEventListener( "progress", onProgress, false );
				return xhr;
			}
		};
	
		if ( _data ) {
			requestData.data = _data;
			//requestData.contentType = "application/json";
		}
	
		$.ajax( requestData ).done( function( response ) {
			_content = response;
			onLoadEnd();
		}).fail( function( request, status, error ) {
			onError( error );
		}).progress( function( event ) {
			onProgress( event );
		}).always( function( event ) {
			onLoadEnd( event );
		});
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
		var e = new ASJS.LoaderEvent( type );
		if ( event && event.total ) {
			e.total = event.total;
			e.loaded = event.loaded;
		}
		that.dispatchEvent( e );
	}
	
	return that;
}
