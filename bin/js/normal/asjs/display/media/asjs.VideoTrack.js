includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );

ASJS.VideoTrack = function() {
	var that = new ASJS.DisplayObject( "<track />" );
	
	defineProperty( that, "src", {
		get: function() { return that.getAttr( "src" ); },
		set: function( value ) { that.setAttr( "src", value ); }
	});
	
	defineProperty( that, "kind", {
		get: function() { return that.getAttr( "kind" ); },
		set: function( value ) { that.setAttr( "kind", value ); }
	});
	
	defineProperty( that, "label", {
		get: function() { return that.getAttr( "label" ); },
		set: function( value ) { that.setAttr( "label", value ); }
	});
	
	defineProperty( that, "srclang", {
		get: function() { return that.getAttr( "srclang" ); },
		set: function( value ) { that.setAttr( "srclang", value ); }
	});
	
	return that;
}
ASJS.VideoTrack.KIND_CAPTIONS		= "captions";
ASJS.VideoTrack.KIND_CHAPTERS		= "chapters";
ASJS.VideoTrack.KIND_DESCRIPTIONS	= "descriptions";
ASJS.VideoTrack.KIND_METADATA		= "metadata";
ASJS.VideoTrack.KIND_SUBTITLES		= "subtitles";
