includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.Link = function() {
	var that = new ASJS.Sprite( "<a />" );
	
	property( that, "href", {
		get: function() { return that.getAttr( "href" ); },
		set: function( value ) { that.setAttr( "href", value ); }
	});
	
	property( that, "target", {
		get: function() { return that.getAttr( "target" ); },
		set: function( value ) { that.setAttr( "target", value ); }
	});
	
	property( that, "download", {
		get: function() { return that.getAttr( "download" ); },
		set: function( value ) { that.setAttr( "download", value ); }
	});
	
	return that;
}

