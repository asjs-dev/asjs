ASJS.Cycler = function() {
	function CyclerInstance() {
		var that = {};
	
		var _isPlaying = false;
		var _fps = 24;
		var _interval = getIntervalByFps();
		var _callbacks = [];
		var _timeoutId;
	
		defineProperty( that, "isPlaying", {
			get: function() { return _isPlaying; }
		});
	
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
		
			var i;
			var l = _callbacks.length;
			var index;
			for ( i = 0; i < l; i++ ) {
				if ( _callbacks[ i ] == callback ) index = i;
			}
		
			_callbacks.splice( index, 1 );
		}
	
		that.callbackExists = function( callback ) {
			var i;
			var l = _callbacks.length;
			for ( i = 0; i < l; i++ ) {
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
			window.clearTimeout( _timeoutId );
		}
	
		function tick() {
			window.clearTimeout( _timeoutId );
		
			var i;
			var l = _callbacks.length;
			for ( i = 0; i < l; i++ ) {
				if ( _callbacks[ i ] ) _callbacks[ i ]();
			}
		
			_timeoutId = window.setTimeout( function() { tick(); }, _interval );
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
