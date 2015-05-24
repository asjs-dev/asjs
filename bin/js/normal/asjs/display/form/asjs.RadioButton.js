includeOnce( "js/normal/asjs/display/list/asjs.ListItem.js" );
includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );

ASJS.RadioButton = function() {
	var that = new ASJS.ListItem( "<label />" );
	var _super = {};
	var _radio = new ASJS.DisplayObject( "<input />" );
	var _label = new ASJS.DisplayObject();
	
	extendProperty( _super, that, "enabled" );
	defineProperty( that, "enabled", {
		set: function( value ) {
			_super.enabled = value;
			if ( value ) {
				_radio.domObject.removeAttr( "disabled" );
				_radio.setCSS( "pointer-events", "auto" );
			} else {
				_radio.setAttr( "disabled", "disabled" );
				_radio.setCSS( "pointer-events", "none" );
			}
			that.drawNow();
		}
	});
	
	defineProperty( that, "label", {
		get: function() { return _label; }
	});
	
	defineProperty( that, "name", {
		get: function() { return_radio.getAttr( "name" ); },
		set: function( value ) { _radio.setAttr( "name", value ); }
	});
	
	defineProperty( that, "checked", {
		get: function() { return _radio.domObject.is( ":checked" ); },
		set: function( value ) {
			_radio.domObject.prop( "checked", value );
			if ( value ) _radio.domObject.change();
		}
	});
	
	defineProperty( that, "val", {
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
