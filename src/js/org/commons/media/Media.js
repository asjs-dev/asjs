includeOnce( "org/asjs/window/asjs.Window.js" );

function Media() {
	return singleton( this, Media, function() {
		var that = {};
		
		var _window = new ASJS.Window().instance;
		
		var _audioContext;
		var _userMedia;
		
		property( that, "audioContext", {
			get: function() {
				if ( !_audioContext ) _audioContext = _window.audioContext;
				return _audioContext;
			}
		});
		
		property( that, "userMedia", {
			get: function() {
				if ( !_userMedia ) _userMedia = _window.userMedia;
				return _userMedia;
			}
		});
		
		that.getUserMedia = function( constraints, callback, errorCallback ) {
			that.userMedia.call( _window.navigator, constraints, callback, errorCallback );
		}
		
		that.getAudioConstraints = function() {
			return { audio: true };
		}
		
		that.getVideoConstraints = function( width, height, facingMode, frameRateIdeal, frameRateMax ) {
			var constraints = { video: true };
			if ( width ) constraints.video.width = width;
			if ( height ) constraints.video.height = height;
			if ( facingMode ) constraints.video.facingMode = facingMode;
			if ( frameRateIdeal || frameRateMax ) {
				constraints.video.frameRate = {};
				if ( frameRateIdeal ) constraints.video.frameRate.ideal = frameRateIdeal;
				if ( frameRateMax ) constraints.video.frameRate.max = frameRateMax;
			}
			return constraints;
		}
		
		that.isSupported = function() {
			return !!that.userMedia;
		}
		
		return that;
	});
}
Media.FACING_MODE_USER			= "user";
Media.FACING_MODE_ENVIRONMENT	= "environment";
