includeOnce( "js/normal/asjs/asjs.Sprite.js" );

ASJS.FormElement = function( domElement ) {
	var that = new ASJS.Sprite( domElement );
	
	defineProperty( that, "checked", {
		get: function() { return false; }
	})
	
	/* CONSTRUCTOR */ {
		that.setAttr( "tabindex", "auto" );
	}
	
	return that;
}
