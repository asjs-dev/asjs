includeOnce( "js/normal/asjs/display/form/asjs.FormElement.js" );

ASJS.AbstractTextElement = function( domElement ) {
	var that = new ASJS.FormElement( domElement );
	var _super = {};
	var _protectedChars = {
		 37: true,
		 38: true,
		 39: true,
		 40: true,
		 8: true,
		 9: true,
		 46: true,
		 13: true,
		 16: true,
		 17: true,
		 35: true,
		 36: true,
		 20: true,
		 27: true
	};
	var _controlChars = {
		 65: true,
		 67: true,
		 86: true,
		 88: true,
		 97: true,
		 99: true,
		 118: true,
		 120: true
	};
	var _restrict;
	
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
	
	that.removedFromStage = function() {
		that.removeEventListeners();
	}
	
	that.addedToStage = function() {
		that.addEventListener( "keypress", function( event ) {
			if ( _restrict ) {
				var charCode = event.which ? event.which : event.keyCode;
				if ( _protectedChars[ event.keyCode ] != undefined || ( event.ctrlKey && _controlChars[ charCode ] != undefined ) ) return;
				if ( !new RegExp( _restrict, "i" ).test( String.fromCharCode( event.which ) ) ) return false;
			}
		});
		that.addEventListener( "keyup", function( event ) {
			var charCode = event.which ? event.which : event.keyCode;
			if ( _restrict && ( event.ctrlKey && _controlChars[ charCode ] != undefined ) ) {
				var regExp = new RegExp( "(?!" + _restrict + ").", "g" );
				that.val = that.val.replace( regExp, '' );
			}
		});
	}
	
	return that;
}
