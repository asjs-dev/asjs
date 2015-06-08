includeOnce( "js/normal/asjs/display/form/asjs.FormElement.js" );
includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );

ASJS.DropDownOption = function( value, label, disabled, selected ) {
	var that = {};
	that.value = value || "0";
	that.label = label || "";
	that.disabled = disabled || false;
	that.selected = selected || false;
	return that;
}

ASJS.DropDown = function() {
	var that = new ASJS.FormElement();
	var _super = {};
	var _select = new ASJS.DisplayObject( "<select />" );
	
	extendProperty( _super, that, "enabled" );
	defineProperty( that, "enabled", {
		set: function( value ) {
			_super.enabled = value;
			_select.enabled = that.enabled;
			that.drawNow();
		}
	})
	
	defineProperty( that, "name", {
		get: function() { return _select.getAttr( "name" ); },
		set: function( value ) { _select.setAttr( "name", value ); }
	});
	
	that.clearOptions = function() {
		_select.html = "";
	}
	
	defineProperty( that, "select", {
		get: function() { return _select; }
	})
	
	defineProperty( that, "val", {
		get: function() { return _select.domObject.val(); },
		set: function( value ) { _select.domObject.val( value ); }
	})
	
	that.setOptions = function( options ) {
		that.clearOptions();
		var i;
		var option;
		for ( i = 0; i < options.length; i++ ) that.addOption( options[ i ] );
	}
	
	that.addOption = function( option ) {
		var optionItem = $( "<option value=\"" + option.value + "\"" + ( option.disabled ? " disabled" : "" ) + "" + ( option.selected ? " selected" : "" ) + ">" + option.label + "</option>" );
		_select.domObject.append( optionItem );
	}
	
	that.drawNow = function() {
		_select.setSize( that.width + 30, that.height );
	}
	
	(function() {
		that.setCSS( "overflow", "hidden" );
		that.addChild( _select );
	})();
	
	return that;
}
