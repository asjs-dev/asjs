includeOnce( "js/normal/asjs/event/asjs.EventDispatcher.js" );
includeOnce( "js/normal/asjs/event/asjs.LoaderEvent.js" );

ASJS.Loader = function() {
	var that = new ASJS.EventDispatcher();
	
	var _url;
	var _data;
	var _requestType;
	var _dataType;
	var _headers = {};
	var _content;
	
	defineProperty( that, "url", {
		get: function() { return _url; }
	});
	
	defineProperty( that, "headers", {
		get: function() { return _headers; },
		set: function( value ) { _headers = value; }
	});
	
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
		_url = url;
		
		var requestData = {
			headers: _headers,
			type: _requestType,
			url: _url,
			dataType: _dataType,
			crossDomain: true,
			xhrFields: {
				withCredentials: true,
				onprogress: onProgress
			},
			success: function ( data ) {
				_content = data;
				onLoad();
			},
			error: function( xhr, textStatus, errorThrown ) {
				_content = xhr.responseText;
				onError( xhr );
			},
			complete: function() {
				onLoadEnd();
			}
		};
	
		if ( _data ) requestData.data = _data;
	
		$.ajax( requestData );
		
		onLoadStart();
	}
	
	function onLoadStart() {
		dispatch( ASJS.LoaderEvent.LOAD_START );
	}
	
	function onProgress( data ) {
		//if ( data.lengthComputable ) 
		dispatch( ASJS.LoaderEvent.PROGRESS, { total: data.total, loaded: data.loaded } );
	}
	
	function onLoad() {
		dispatch( ASJS.LoaderEvent.LOAD );
	}
	
	function onLoadEnd() {
		dispatch( ASJS.LoaderEvent.LOAD_END );
	}
	
	function onError( data ) {
		dispatch( ASJS.LoaderEvent.ERROR, data );
	}
	
	function dispatch( type, data ) {
		var e = new ASJS.LoaderEvent( type );
			e.value = data;
		that.dispatchEvent( e );
	}
	
	return that;
}
