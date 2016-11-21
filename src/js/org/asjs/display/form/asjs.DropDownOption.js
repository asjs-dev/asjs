includeOnce( "org/asjs/display/asjs.PrimitiveDisplayObject.js" );

ASJS.DropDownOption = function( value, label, disabled, selected ) {
	var that = new ASJS.PrimitiveDisplayObject( "<option />" );
	
	property( that, "value", {
		get: function() { return that.getAttr( "value" ); },
		set: function( value ) { that.setAttr( "value", value ); }
	});
	
	property( that, "label", {
		get: function() { return that.text; },
		set: function( value ) { that.text = value; }
	});
	
	property( that, "selected", {
		get: function() { return that.getAttr( "selected" ); },
		set: function( value ) {
			if ( value ) that.setAttr( "selected", "selected" );
			else that.removeAttr( "selected" );
		}
	});
	
	property( that, "disabled", {
		get: function() { return that.getAttr( "disabled" ); },
		set: function( value ) {
			if ( value ) that.setAttr( "disabled", "disabled" );
			else that.removeAttr( "disabled" );
		}
	});
	
	(function() {
		if ( value != null )	that.value = value;
		if ( label != null )	that.label = label;
		if ( disabled != null )	that.disabled = disabled;
		if ( selected != null )	that.selected = selected;
	})();
	
	return that;
}
