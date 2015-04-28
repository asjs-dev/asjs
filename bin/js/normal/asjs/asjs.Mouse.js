includeOnce( "js/normal/asjs/asjs.Point.js" );

ASJS.Mouse = function() {
	function MouseInstance() {
		var that = {};
	
		var _mouseX = 0;
		var _mouseY = 0;
	
		defineProperty( that, "mouseX", {
			get: function() { return _mouseX; }
		});
	
		defineProperty( that, "mouseY", {
			get: function() { return _mouseY; }
		});
	
		that.show = function() { $( "body" ).css( "cursor", "default" ); }	
		that.hide = function() { $( "body" ).css( "cursor", "none" ); }
	
		that.getRelativePosition = function( value ) {
			if ( !value ) throw new Error( "Mouse.getRelativePosition: Value is null" );
			return value.globalToLocal( new ASJS.Point( that.mouseX, that.mouseY ) );
		};
	
		/* CONSTRUCTOR */{
			$( window ).on( "mousemove", function( event ) {
				_mouseX = event.pageX;
				_mouseY = event.pageY;
			});
		}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !ASJS.Mouse.$ ) ASJS.Mouse.$ = new MouseInstance();
			return ASJS.Mouse.$;
		}
	});
}
