includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.RadioButton = function() {
	var that = new ASJS.FormElement( "<label />" );
	var _super = {};
	var _radio = new ASJS.DisplayObject( "<input />" );
	var _label = new ASJS.DisplayObject();
	
	extendProperty( _super, that, "enabled" );
	property( that, "enabled", {
		set: function( value ) {
			_super.enabled = value;
			_radio.enabled = that.enabled;
			that.drawNow();
		}
	});
	
	property( that, "radio", { get: function() { return _radio; } } );
	
	property( that, "name", {
		get: function() { return _radio.getAttr( "name" ); },
		set: function( value ) { _radio.setAttr( "name", value ); }
	});
	
	property( that, "checked", {
		get: function() { return _radio.jQuery.is( ":checked" ); },
		set: function( value ) {
			_radio.jQuery.prop( "checked", value );
			if ( value ) _radio.jQuery.change();
		}
	});
	
	property( that, "val", {
		get: function() { return _radio.getAttr( "value" ); },
		set: function( value ) { _radio.setAttr( "value", value ); }
	});
	
	that.drawNow = function() {};
	
	(function() {
		_radio.setAttr( "type", "radio" );
		_radio.visible = false;
		that.addChild( _radio );
		
		_label.setSize( "100%", "100%" );
		_label.enabled = false;
		that.addChild( _label );
	})();
	
	return that;
}
