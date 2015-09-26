includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.DropDownOption = function( value, label, disabled, selected ) {
	var that = new ASJS.DisplayObject( "<option />" );
	
	defineProperty( that, "value", {
		set: function( value ) { that.setAttr( "value", value ); },
		get: function() { return that.getAttr( "value" ); }
	});
	
	defineProperty( that, "label", {
		set: function( value ) { that.text = value; },
		get: function() { return that.text; }
	});
	
	defineProperty( that, "selected", {
		set: function( value ) {
			if ( value ) that.setAttr( "selected", "selected" );
			else that.removeAttr( "selected" );
		},
		get: function() { return that.getAttr( "selected" ); }
	});
	
	defineProperty( that, "disabled", {
		set: function( value ) {
			if ( value ) that.setAttr( "disabled", "disabled" );
			else that.removeAttr( "disabled" );
		},
		get: function() { return that.getAttr( "selected" ); }
	});
	
	return that;
}
