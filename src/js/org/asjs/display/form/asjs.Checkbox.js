includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.Checkbox = function() {
	var that = new ASJS.FormElement( "<label />" );
	var _super = {};
	
	var _checkbox = new ASJS.DisplayObject( "<input />" );
	var _label = new ASJS.DisplayObject();
	
	extendProperty( _super, that, "enabled" );
	property( that, "enabled", {
		set: function( value ) {
			_super.enabled = value;
			_checkbox.enabled = that.enabled;
			that.drawNow();
		}
	});
	
	property( that, "label", { get: function() { return _label; } } );
	
	property( that, "checkbox", { get: function() { return _checkbox; } } );
	
	property( that, "name", {
		get: function() { return _checkbox.getAttr( "name" ); },
		set: function( value ) { _checkbox.setAttr( "name", value ); }
	});
	
	property( that, "checked", {
		get: function() { return _checkbox.jQuery.is( ":checked" ); },
		set: function( value ) {
			_checkbox.jQuery.prop( "checked", value );
			_checkbox.jQuery.change();
		}
	});
	
	function init() {
		_checkbox.setAttr( "type", "checkbox" );
		_checkbox.visible = false;
		that.addChild( _checkbox );
		
		_label.setSize( "100%", "100%" );
		_label.enabled = false;
		that.addChild( _label );
	}
	
	(function() {
		init();
	})();
	
	return that;
}
