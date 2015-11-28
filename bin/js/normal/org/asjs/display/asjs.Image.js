includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.Image = function() {
	var that = new ASJS.DisplayObject( "<img />" );
	
	defineProperty( that, "src", {
		get: function() { return that.getAttr( "src" ); },
		set: function( value ) { that.setAttr( "src", value ); }
	});
	
	defineProperty( that, "alt", {
		get: function() { return that.getAttr( "alt" ); },
		set: function( value ) { that.setAttr( "alt", value ); }
	});
	
	defineProperty( that, "title", {
		get: function() { return that.getAttr( "title" ); },
		set: function( value ) { that.setAttr( "title", value ); }
	});
	
	return that;
}
