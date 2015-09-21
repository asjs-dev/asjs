includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.AbstractMediaPlayer = function( type ) {
	var that = new ASJS.Sprite( type );
	
	defineProperty( that, "controls", {
		get: function() { return that.domElement.controls; },
		set: function( value ) { that.domElement.controls = value; }
	});
	
	defineProperty( that, "preload", {
		get: function() { return that.domElement.preload; },
		set: function( value ) { that.domElement.preload = value; }
	});
	
	defineProperty( that, "muted", {
		get: function() { return that.domElement.muted; },
		set: function( value ) { that.domElement.muted = value; }
	});
	
	defineProperty( that, "loop", {
		get: function() { return that.domElement.loop; },
		set: function( value ) { that.domElement.loop = value; }
	});
	
	defineProperty( that, "autoplay", {
		get: function() { return that.domElement.autoplay; },
		set: function( value ) { that.domElement.autoplay = value; }
	});
	
	defineProperty( that, "src", {
		get: function() { return that.domElement.src; },
		set: function( value ) { that.domElement.src = value; }
	});
	
	defineProperty( that, "crossOrigin", {
		get: function() { return that.domElement.crossOrigin; },
		set: function( value ) { that.domElement.crossOrigin = value; }
	});
	
	defineProperty( that, "currentTime", {
		get: function() { return that.domElement.currentTime; },
		set: function( value ) { that.domElement.currentTime = value; }
	});
	
	defineProperty( that, "defaultMuted", {
		get: function() { return that.domElement.defaultMuted; },
		set: function( value ) { that.domElement.defaultMuted = value; }
	});
	
	defineProperty( that, "defaultPlaybackRate", {
		get: function() { return that.domElement.defaultPlaybackRate; },
		set: function( value ) { that.domElement.defaultPlaybackRate = value; }
	});
	
	defineProperty( that, "mediaGroup", {
		get: function() { return that.domElement.mediaGroup; },
		set: function( value ) { that.domElement.mediaGroup = value; }
	});
	
	defineProperty( that, "playbackRate", {
		get: function() { return that.domElement.playbackRate; },
		set: function( value ) { that.domElement.playbackRate = value; }
	});
	
	defineProperty( that, "volume", {
		get: function() { return that.domElement.volume; },
		set: function( value ) { that.domElement.volume = value; }
	});
	
	defineProperty( that, "buffered", {
		get: function() { return that.domElement.buffered; },
	});
	
	defineProperty( that, "controller", {
		get: function() { return that.domElement.controller; },
	});
	
	defineProperty( that, "currentSrc", {
		get: function() { return that.domElement.currentSrc; },
	});
	
	defineProperty( that, "duration", {
		get: function() { return that.domElement.duration; },
	});
	
	defineProperty( that, "ended", {
		get: function() { return that.domElement.ended; },
	});
	
	defineProperty( that, "error", {
		get: function() { return that.domElement.error; },
	});
	
	defineProperty( that, "networkState", {
		get: function() { return that.domElement.networkState; },
	});
	
	defineProperty( that, "paused", {
		get: function() { return that.domElement.paused; },
	});
	
	defineProperty( that, "played", {
		get: function() { return that.domElement.played; },
	});
	
	defineProperty( that, "readyState", {
		get: function() { return that.domElement.readyState; },
	});
	
	defineProperty( that, "seekable", {
		get: function() { return that.domElement.seekable; },
	});
	
	defineProperty( that, "seeking", {
		get: function() { return that.domElement.seeking; },
	});
	
	defineProperty( that, "startDate", {
		get: function() { return that.domElement.startDate; },
	});
	
	defineProperty( that, "textTracks", {
		get: function() { return that.domElement.textTracks; },
	});
	
	that.play = function() {
		that.domElement.play();
	}
	
	that.pause = function() {
		that.domElement.pause();
	}
	
	that.load = function() {
		that.domElement.load();
	}
	
	(function() {
		that.controls = false;
		that.preload = true;
	})();
	
	return that;
}
