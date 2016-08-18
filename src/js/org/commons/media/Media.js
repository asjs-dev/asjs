function Media() {
	function MediaInstance() {
		var that = {};
		
		var _audioContext;
		var _userMedia;
		
		defineProperty( that, "audioContext", {
			get: function() {
				if ( !_audioContext ) _audioContext = ( window.AudioContext || window.webkitAudioContext );
				return _audioContext;
			}
		});
		
		defineProperty( that, "userMedia", {
			get: function() {
				if ( !_userMedia ) _userMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia );
				return _userMedia;
			}
		});
		
		that.getUserMedia = function( constraints, callback, errorCallback ) {
			that.userMedia.call( navigator, constraints, callback, errorCallback );
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
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Media.$ ) Media.$ = new MediaInstance();
			return Media.$;
		}
	});
}
Media.FACING_MODE_USER			= "user";
Media.FACING_MODE_ENVIRONMENT	= "environment";
