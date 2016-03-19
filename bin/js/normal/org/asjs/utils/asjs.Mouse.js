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
		
		function onMouseMove( event ) {
			var evt = event.originalEvent && event.originalEvent.touches && event.originalEvent.touches[ 0 ] ? 
						event.originalEvent.touches[ 0 ] : event;
			_mousePos.x = evt.pageX;
			_mousePos.y = evt.pageY;
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
