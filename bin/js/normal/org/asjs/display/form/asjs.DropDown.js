includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/display/form/asjs.DropDownOption.js" );

ASJS.DropDown = function() {
	var that = new ASJS.FormElement();
	var _super = {};
	
	var _select = new ASJS.Sprite( "<select />" );
	
	extendProperty( _super, that, "enabled" );
	defineProperty( that, "enabled", {
		set: function( value ) {
			_super.enabled = value;
			_select.enabled = that.enabled;
			that.drawNow();
		}
	});
	
	defineProperty( that, "name", {
		get: function() { return _select.getAttr( "name" ); },
		set: function( value ) { _select.setAttr( "name", value ); }
	});
	
	defineProperty( that, "select", { get: function() { return _select; } } );
	
	defineProperty( that, "val", {
		get: function() { return _select.domObject.val(); },
		set: function( value ) { _select.domObject.val( value ); }
	});
	
	that.clearOptions = function() {
		_select.html = "";
	}
	
	that.setOptions = function( options ) {
		that.clearOptions();
		var i;
		var l = options.length;
		var option;
		for ( i = 0; i < l; i++ ) that.addOption( options[ i ] );
	}
	
	that.addOption = function( option ) {
		_select.addChild( option );
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
