includeOnce( "js/normal/asjs/asjs.Sprite.js" );

ASJS.FormElement = function( domElement ) {
	var that = new ASJS.Sprite( domElement );
	
	/* CONSTRUCTOR */ {
		that.setAttr( "tabindex", "auto" );
	}
	
	return that;
}
