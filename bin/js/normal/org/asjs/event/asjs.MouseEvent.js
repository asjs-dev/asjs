includeOnce( "org/asjs/event/asjs.Event.js" );

ASJS.MouseEvent = function( type ) {
	var that = new ASJS.Event( type );
	return that;
}
ASJS.MouseEvent.CLICK		= "click";
ASJS.MouseEvent.MOUSE_DOWN	= "mousedown";
ASJS.MouseEvent.MOUSE_UP	= "mouseup";
ASJS.MouseEvent.MOUSE_LEAVE	= "mouseleave";
ASJS.MouseEvent.MOUSE_MOVE	= "mousemove";
ASJS.MouseEvent.TOUCH_START	= "touchstart";
ASJS.MouseEvent.TOUCH_END	= "touchend";
ASJS.MouseEvent.TOUCH_MOVE	= "touchmove";
