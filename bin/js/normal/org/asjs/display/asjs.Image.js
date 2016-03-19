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
	
	defineProperty( that, "imageWidth", {
		get: function() { return that.domElement.width; }
	});
	
	defineProperty( that, "imageHeight", {
		get: function() { return that.domElement.height; }
	});
	
	return that;
}
