includeOnce( "org/asjs/display/form/asjs.FormElement.js" );

ASJS.ListItem = function( domElement ) {
	var that = new ASJS.FormElement( domElement );
	var _checked = false;
	var _value = "";
	
	defineProperty( that, "name", {
		get: function() { return that.getAttr( "name" ); },
		set: function( value ) { that.setAttr( "name", value ); }
	});
	
	defineProperty( that, "checked", {
		get: function() { return _checked; },
		set: function( value ) { _checked = value; }
	});
	
	defineProperty( that, "val", {
		get: function() { return _value; },
		set: function( value ) { _value = value; }
	});
	
	return that;
}
