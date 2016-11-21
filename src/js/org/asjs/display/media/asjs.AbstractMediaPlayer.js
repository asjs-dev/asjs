includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.AbstractMediaPlayer = function( tag ) {
	var that = new ASJS.Sprite( tag );
	
	property( that, "controls", {
		get: function() { return that.el.controls; },
		set: function( value ) { that.el.controls = value; }
	});
	
	property( that, "preload", {
		get: function() { return that.el.preload; },
		set: function( value ) { that.el.preload = value; }
	});
	
	property( that, "muted", {
		get: function() { return that.el.muted; },
		set: function( value ) { that.el.muted = value; }
	});
	
	property( that, "loop", {
		get: function() { return that.el.loop; },
		set: function( value ) { that.el.loop = value; }
	});
	
	property( that, "autoplay", {
		get: function() { return that.el.autoplay; },
		set: function( value ) { that.el.autoplay = value; }
	});
	
	property( that, "src", {
		get: function() { return that.el.src; },
		set: function( value ) { that.el.src = value; }
	});
	
	property( that, "crossOrigin", {
		get: function() { return that.el.crossOrigin; },
		set: function( value ) { that.el.crossOrigin = value; }
	});
	
	property( that, "currentTime", {
		get: function() { return that.el.currentTime; },
		set: function( value ) { that.el.currentTime = value; }
	});
	
	property( that, "defaultMuted", {
		get: function() { return that.el.defaultMuted; },
		set: function( value ) { that.el.defaultMuted = value; }
	});
	
	property( that, "defaultPlaybackRate", {
		get: function() { return that.el.defaultPlaybackRate; },
		set: function( value ) { that.el.defaultPlaybackRate = value; }
	});
	
	property( that, "mediaGroup", {
		get: function() { return that.el.mediaGroup; },
		set: function( value ) { that.el.mediaGroup = value; }
	});
	
	property( that, "playbackRate", {
		get: function() { return that.el.playbackRate; },
		set: function( value ) { that.el.playbackRate = value; }
	});
	
	property( that, "volume", {
		get: function() { return that.el.volume; },
		set: function( value ) { that.el.volume = value; }
	});
	
	property( that, "buffered", { get: function() { return that.el.buffered; } } );
	property( that, "controller", { get: function() { return that.el.controller; } } );
	property( that, "currentSrc", { get: function() { return that.el.currentSrc; } } );
	property( that, "duration", { get: function() { return that.el.duration; } } );
	property( that, "ended", { get: function() { return that.el.ended; } } );
	property( that, "error", { get: function() { return that.el.error; } } );
	property( that, "networkState", { get: function() { return that.el.networkState; } } );
	property( that, "paused", { get: function() { return that.el.paused; } } );
	property( that, "played", { get: function() { return that.el.played; } } );
	property( that, "readyState", { get: function() { return that.el.readyState; } } );
	property( that, "seekable", { get: function() { return that.el.seekable; } } );
	property( that, "seeking", { get: function() { return that.el.seeking; } } );
	property( that, "startDate", { get: function() { return that.el.startDate; } } );
	property( that, "textTracks", { get: function() { return that.el.textTracks; } } );
	
	that.play = function() {
		that.el.play();
	}
	
	that.pause = function() {
		that.el.pause();
	}
	
	that.load = function() {
		that.el.load();
	}
	
	(function() {
		that.controls = false;
		that.preload = true;
	})();
	
	return that;
}
