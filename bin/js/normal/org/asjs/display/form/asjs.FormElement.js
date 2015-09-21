includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.FormElement = function( domElement ) {
	var that = new ASJS.Sprite( domElement );
	
	defineProperty( that, "name", {
		get: function() { return that.getAttr( "name" ); },
		set: function( value ) { that.setAttr( "name", value ); }
	});
	
	that.drawNow = function() {};
	
	(function() {
		that.setAttr( "tabindex", "auto" );
	})();
	
	return that;
}
