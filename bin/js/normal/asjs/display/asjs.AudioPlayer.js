includeOnce( "js/normal/asjs/display/asjs.Sprite.js" );

ASJS.AudioPlayer = function() {
	var that = new ASJS.Sprite( "<audio />" );
	
	defineProperty( that, "controls", {
		get: function() { return that.getAttr( "controls" ); },
		set: function( value ) { that.setAttr( "controls", value ); }
	});
	
	defineProperty( that, "preload", {
		get: function() { return that.getAttr( "preload" ); },
		set: function( value ) { that.setAttr( "preload", value ); }
	});
	
	defineProperty( that, "muted", {
		get: function() { return that.getAttr( "muted" ); },
		set: function( value ) { that.setAttr( "muted", value ); }
	});
	
	defineProperty( that, "loop", {
		get: function() { return that.getAttr( "loop" ); },
		set: function( value ) { that.setAttr( "loop", value ); }
	});
	
	defineProperty( that, "autoplay", {
		get: function() { return that.getAttr( "autoplay" ); },
		set: function( value ) { that.setAttr( "autoplay", value ); }
	});
	
	defineProperty( that, "src", {
		get: function() { return that.setAttr( "src" ); },
		set: function( value ) { that.setAttr( "src", _streamUrl ); }
	});
	
	(function() {
		that.controls = false;
		that.preload = true;
	})();
	
	return that;
}
