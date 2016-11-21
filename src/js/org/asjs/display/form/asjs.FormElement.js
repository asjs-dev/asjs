includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.FormElement = function( tag ) {
	var that = new ASJS.Sprite( tag );
	
	property( that, "name", {
		get: function() { return that.getAttr( "name" ); },
		set: function( value ) { that.setAttr( "name", value ); }
	});
	
	that.drawNow = function() {};
	
	(function() {
		that.tabIndex = "auto";
	})();
	
	return that;
}
