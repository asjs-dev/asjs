includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );

ASJS.Loader = function() {
	var that = new ASJS.EventDispatcher();
	
	var _url;
	var _data;
	var _requestType;
	var _contentType = false;
	var _dataType;
	var _headers;
	var _content;
	
	property( that, "url", { get: function() { return _url; } } );
	property( that, "content", { get: function() { return _content; } } );
	
	property( that, "headers", {
		get: function() { return _headers; },
		set: function( value ) { _headers = value; }
	});
	
	property( that, "data", {
		get: function() { return _data; },
		set: function( value ) { _data = value; }
	});

	property( that, "requestType", {
		get: function() { return _requestType; },
		set: function( value ) { _requestType = value; }
	});
	
	property( that, "dataType", {
		get: function() { return _dataType; },
		set: function( value ) { _dataType = value; }
	});
	
	property( that, "contentType", {
		get: function() { return _contentType; },
		set: function( value ) { _contentType = value; }
	});
	
	that.load = function( url ) {
		if ( !url ) return;
		_url = url;
		
		var requestData = {
			type: _requestType,
			url: _url,
			cache: false,
			contentType: _contentType,
			crossDomain: true,
			processData: false,
			xhrFields: {
				withCredentials: true,
				onprogress: onProgress
			},
			progress: function( event ) {
				if ( event.lengthComputable ) onProgress( event );
		    },
			success: onSuccessEvent,
			error: onErrorEvent,
			complete: onCompleteEvent
		};
	
		if ( _dataType )	requestData.dataType = _dataType;
		if ( _data )		requestData.data = _data;
		if ( _headers )		requestData.headers = _headers;
	
		$.ajax( requestData );
		
		onLoadStart();
	}
	
	function onSuccessEvent( data ) {
		_content = data;
		onLoad( data );
	}
	
	function onErrorEvent( xhr, textStatus, errorThrown ) {
		_content = xhr;
		onError( xhr );
	}
	
	function onCompleteEvent( data ) {
		onLoadEnd( data );
	}
	
	function onLoadStart() {
		dispatch( ASJS.LoaderEvent.LOAD_START );
	}
	
	function onProgress( data ) {
		dispatch( ASJS.LoaderEvent.PROGRESS, data );
	}
	
	function onLoad( data ) {
		dispatch( ASJS.LoaderEvent.LOAD, data );
	}
	
	function onLoadEnd( data ) {
		dispatch( ASJS.LoaderEvent.LOAD_END, data );
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
};
