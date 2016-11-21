includeOnce( "org/asjs/display/form/asjs.FormElement.js" );

ASJS.ListItem = function( tag ) {
	var that = new ASJS.FormElement( tag );
	var _checked = false;
	var _value = "";
	
	property( that, "name", {
		get: function() { return that.getAttr( "name" ); },
		set: function( value ) { that.setAttr( "name", value ); }
	});
	
	property( that, "checked", {
		get: function() { return _checked; },
		set: function( value ) { _checked = value; }
	});
	
	property( that, "val", {
		get: function() { return _value; },
		set: function( value ) { _value = value; }
	});
	
	return that;
}
