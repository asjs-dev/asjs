includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/event/asjs.KeyboardEvent.js" );
includeOnce( "org/asjs/event/asjs.Event.js" );
includeOnce( "org/asjs/utils/asjs.Keyboard.js" );

ASJS.AbstractTextElement = function( domElement ) {
	var that = new ASJS.FormElement( domElement );
	var _super = {};
	
	var _protectedChars = [
		ASJS.Keyboard.LEFT_ARROW,
		ASJS.Keyboard.UP_ARROW,
		ASJS.Keyboard.RIGHT_ARROW,
		ASJS.Keyboard.DOWN_ARROW,
		ASJS.Keyboard.BACKSPACE,
		ASJS.Keyboard.TAB,
		ASJS.Keyboard.DELETE,
		ASJS.Keyboard.ENTER,
		ASJS.Keyboard.SHIFT,
		ASJS.Keyboard.CTRL,
		ASJS.Keyboard.END,
		ASJS.Keyboard.HOME,
		ASJS.Keyboard.CAPS_LOCK,
		ASJS.Keyboard.ESCAPE
	];
	var _controlChars = [
		ASJS.Keyboard.A,
		ASJS.Keyboard.C,
		ASJS.Keyboard.V,
		ASJS.Keyboard.X,
		ASJS.Keyboard.NUMPAD_1,
		ASJS.Keyboard.NUMPAD_3,
		ASJS.Keyboard.F7,
		ASJS.Keyboard.F9
	];
	var _restrict;
	
	defineProperty( that, "readonly", {
		get: function() { return that.getAttr( "readonly" ); },
		set: function( value ) {
			if ( value ) that.setAttr( "readonly", "readonly" );
			else that.removeAttr( "readonly" );
		}
	})
	
	defineProperty( that, "placeholder", {
		get: function() { return that.getAttr( "placeholder" ); },
		set: function( value ) { that.setAttr( "placeholder", value ); }
	})
	
	defineProperty( that, "val", {
		get: function() { return that.domObject.val(); },
		set: function( value ) { that.domObject.val( value ); }
	})
	
	defineProperty( that, "maxChar", {
		get: function() { return that.getAttr( "maxLength" ); },
		set: function( value ) { that.setAttr( "maxLength", value ); }
	})
	
	defineProperty( that, "restrict", {
		get: function() { return _restrict; },
		set: function( value ) { _restrict = value; }
	})
	
	function onKeyPress( event ) {
		if ( _restrict ) {
			var charCode = event.which ? event.which : event.keyCode;
			if ( _protectedChars.indexOf( event.keyCode ) > -1 || ( event.ctrlKey && _controlChars.indexOf( charCode ) > -1 ) ) return;
			if ( !new RegExp( _restrict, "i" ).test( String.fromCharCode( event.which ) ) ) return false;
		}
	}
	
	function onKeyUp( event ) {
		var charCode = event.which ? event.which : event.keyCode;
		if ( event.ctrlKey && _controlChars.indexOf( charCode ) > -1 ) onChange( event );
	}
	
	function onChange( event ) {
		if ( _restrict ) {
			var regExp = new RegExp( "(?!" + _restrict + ").", "g" );
			that.val = that.val.replace( regExp, '' );
		}
	}
	
	(function() {
		that.addEventListener( ASJS.KeyboardEvent.KEY_PRESS, onKeyPress );
		that.addEventListener( ASJS.KeyboardEvent.KEY_UP, onKeyUp );
		that.addEventListener( ASJS.Event.CHANGE, onChange );
	})();
	
	return that;
}
