includeOnce( "org/asjs/geom/asjs.Point.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

ASJS.Mouse = function() {
	function MouseInstance() {
		var that = {};
	
		var EVENT = ASJS.MouseEvent.MOUSE_MOVE + " " + ASJS.MouseEvent.TOUCH_MOVE;
		
		var _mousePos = new ASJS.Point();
	
		defineProperty( that, "mouseX", { get: function() { return _mousePos.x; } } );
		defineProperty( that, "mouseY", { get: function() { return _mousePos.y; } } );
	
		that.show = function() { stage.setCSS( "cursor", "default" ); }	
		that.hide = function() { stage.setCSS( "cursor", "none" ); }
	
		that.getRelativePosition = function( value ) { return value.globalToLocal( _mousePos ); };
		
		that.init = function() {
			if ( stage && !stage.window.hasEventListener( EVENT, onMouseMove ) ) stage.window.addEventListener( EVENT, onMouseMove );
		}
		
		that.getTouchPointByEvent = function( event ) {
			var touches = event.touches || event.originalEvent.touches;
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
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !ASJS.Mouse.$ ) ASJS.Mouse.$ = new MouseInstance();
			return ASJS.Mouse.$;
		}
	});
}
