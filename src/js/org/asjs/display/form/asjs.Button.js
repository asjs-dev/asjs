includeOnce( "org/asjs/display/form/asjs.FormElement.js" );

ASJS.Button = function() {
	var that = new ASJS.FormElement( "<input />" );
	
	property( that, "label", {
		get: function() { return that.getAttr( "value" ); },
		set: function( value ) { that.setAttr( "value", value ); }
	});
	
	property( that, "submit", {
		get: function() { return that.getAttr( "type" ) == "submit"; },
		set: function( value ) { that.setAttr( "type", value ? "submit" : "button" ); }
	});
	
	(function() {
		that.setAttr( "type", "button" );
	})();
	
	return that;
}
