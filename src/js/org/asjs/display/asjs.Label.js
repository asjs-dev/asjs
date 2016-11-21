includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.Label = function() {
	var that = new ASJS.DisplayObject( "<label />" );
	
	property( that, "for", {
		get: function() { return that.getAttr( "for" ); },
		set: function( value ) {
			if ( value && value.id ) that.setAttr( "for", value.id );
		}
	});
	
	return that;
}
