includeOnce( "js/normal/asjs/asjs.FormElement.js" );

ASJS.Link = function() {
	var that = new ASJS.FormElement( "<a />" );
	
	defineProperty( that, "href", {
		get: function() { return that.getAttr( "href" ); },
		set: function( value ) { that.setAttr( "href", value ); }
	});
	
	defineProperty( that, "target", {
		get: function() { return that.getAttr( "target" ); },
		set: function( value ) { that.setAttr( "target", value ); }
	});
	
	defineProperty( that, "title", {
		get: function() { return that.getAttr( "title" ); },
		set: function( value ) { that.setAttr( "title", value ); }
	});
	
	/* CONSTRUCTOR */ {}
	
	return that;
}

