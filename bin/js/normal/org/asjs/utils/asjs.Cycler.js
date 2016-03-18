ASJS.Cycler = function() {
	function CyclerInstance() {
		var that = {};
	
		var _isPlaying = false;
		var _fps = 24;
		var _interval = getIntervalByFps();
		var _callbacks = [];
		var _timeoutId;
	
		defineProperty( that, "isPlaying", { get: function() { return _isPlaying; } } );
	
		defineProperty( that, "fps", {
			get: function() { return _fps; },
			set: function( value ) {
				_fps = value;
				_interval = getIntervalByFps();
				that.start();
			}
		});
	
		that.addCallback = function( callback ) {
			if ( that.callbackExists( callback ) ) return;
			_callbacks.push( callback );
		}
	
		that.removeCallback = function( callback ) {
			if ( !that.callbackExists( callback ) ) return;
		
			var i = -1;
			var l = _callbacks.length;
			var index;
			while ( ++i < l ) {
				if ( _callbacks[ i ] == callback ) index = i;
			}
		
			_callbacks.splice( index, 1 );
		}
	
		that.callbackExists = function( callback ) {
			var i = -1;
			var l = _callbacks.length;
			while ( ++i < l ) {
				if ( _callbacks[ i ] == callback ) return true;
			}
		
			return false;
		}
	
		that.start = function() {
			_isPlaying = true;
			tick();
		}
	
		that.stop = function() {
			_isPlaying = false;
			_timeoutId = stage.window.clearTimeout( _timeoutId );
		}
	
		function tick() {
			_timeoutId = stage.window.clearTimeout( _timeoutId );
		
			var i = -1;
			var l = _callbacks.length;
			while ( ++i < l ) {
				if ( _callbacks[ i ] ) _callbacks[ i ]();
			}
		
			_timeoutId = stage.window.setTimeout( tick, _interval );
		}
	
		function getIntervalByFps() {
			return 1000 / _fps;
		}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !ASJS.Cycler.$ ) ASJS.Cycler.$ = new CyclerInstance();
			return ASJS.Cycler.$;
		}
	});
}
