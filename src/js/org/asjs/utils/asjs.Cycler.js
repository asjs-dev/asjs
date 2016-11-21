includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.Cycler = function() {
	return singleton( this, ASJS.Cycler, function() {
		var that = {};
		
		var _window = new ASJS.Window().instance;
	
		var _isPlaying = false;
		var _fps = 24;
		var _interval = getIntervalByFps();
		var _callbacks = [];
		var _timeoutId;
	
		property( that, "isPlaying", { get: function() { return _isPlaying; } } );
	
		property( that, "fps", {
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
			_timeoutId = _window.clearTimeout( _timeoutId );
		}
	
		function tick() {
			_timeoutId = _window.clearTimeout( _timeoutId );
		
			var i = -1;
			var l = _callbacks.length;
			while ( ++i < l ) {
				if ( _callbacks[ i ] ) _callbacks[ i ]();
			}
		
			_timeoutId = _window.setTimeout( tick, _interval );
		}
	
		function getIntervalByFps() {
			return 1000 / _fps;
		}
		
		return that;
	});
}
