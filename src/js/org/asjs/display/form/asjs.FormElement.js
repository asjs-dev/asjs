includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.FormElement = function( domElement ) {
	var that = new ASJS.Sprite( domElement );
	
	defineProperty( that, "tabIndex", {
		get: function() { return that.getAttr( "tabindex" ); },
		set: function( value ) { that.setAttr( "tabindex", value ); }
	});
	
	defineProperty( that, "name", {
		get: function() { return that.getAttr( "name" ); },
		set: function( value ) { that.setAttr( "name", value ); }
	});
	
	that.drawNow = function() {};
	
	(function() {
		that.tabIndex = "auto";
	})();
	
	return that;
}
