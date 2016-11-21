includeOnce( "org/asjs/geom/asjs.Point.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.Mouse = function() {
	return singleton( this, ASJS.Mouse, function() {
		var that = {};
		
		var _window = new ASJS.Window().instance;
	
		var EVENT = ASJS.MouseEvent.MOUSE_MOVE + " " + ASJS.MouseEvent.TOUCH_MOVE;
		
		var _mousePos = new ASJS.Point();
	
		property( that, "mouseX", { get: function() { return _mousePos.x; } } );
		property( that, "mouseY", { get: function() { return _mousePos.y; } } );
	
		that.show = function() { stage.setCSS( "cursor", "default" ); }	
		that.hide = function() { stage.setCSS( "cursor", "none" ); }
	
		that.getRelativePosition = function( value ) { return value.globalToLocal( _mousePos ); };
		
		that.init = function() {
			if ( stage && !_window.hasEventListener( EVENT, onMouseMove ) ) _window.addEventListener( EVENT, onMouseMove );
		}
		
		that.getTouchPointByEvent = function( event ) {
			var iosTouchEvent = event.touches;
			var androidTouchEvent = ( event.originalEvent ? event.originalEvent.touches : null );
			var touches = iosTouchEvent || androidTouchEvent;
			if ( touches && touches.length > 0 ) {
				var touch = touches[ 0 ];
				return new ASJS.Point( touch.pageX, touch.pageY );
			}
			return new ASJS.Point( event.pageX, event.pageY );
		}
		
		function onMouseMove( event ) {
			_mousePos = that.getTouchPointByEvent( event );
		}
		
		return that;
	});
}
