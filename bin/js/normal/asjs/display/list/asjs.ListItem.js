includeOnce( "js/normal/asjs/display/form/asjs.FormElement.js" );

ASJS.ListItem = function( domElement ) {
	var that = new ASJS.FormElement( domElement );
	var _name = "";
	var _checked = "";
	var _value = "";
	
	defineProperty( that, "name", {
		get: function() { return _name; },
		set: function( value ) { _name = value; }
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
