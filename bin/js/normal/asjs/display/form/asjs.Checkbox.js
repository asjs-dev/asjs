includeOnce( "js/normal/asjs/display/form/asjs.FormElement.js" );
includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );

ASJS.Checkbox = function() {
	var that = new ASJS.FormElement( "<label />" );
	var _super = {};
	var _checkbox = new ASJS.DisplayObject( "<input />" );
	var _label = new ASJS.DisplayObject();
	
	extendProperty( _super, that, "enabled" );
	defineProperty( that, "enabled", {
		set: function( value ) {
			_super.enabled = value;
			if ( value ) {
				_checkbox.domObject.removeAttr( "disabled" );
				_checkbox.setCSS( "pointer-events", "auto" );
			} else {
				_checkbox.setAttr( "disabled", "disabled" );
				_checkbox.setCSS( "pointer-events", "none" );
			}
			that.drawNow();
		}
	});
	
	defineProperty( that, "label", {
		get: function() { return _label; }
	});
	
	defineProperty( that, "checked", {
		get: function() { return _checkbox.domObject.is( ":checked" ); },
		set: function( value ) {
			_checkbox.domObject.prop( "checked", value );
			_checkbox.domObject.change();
		}
	});
	
	(function() {
		_checkbox.setAttr( "type", "checkbox" );
		_checkbox.visible = false;
		that.addChild( _checkbox );
		
		_label.setSize( "100%", "100%" );
		_label.enabled = false;
		that.addChild( _label );
	})();
	
	return that;
}
