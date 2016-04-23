includeOnce( "org/asjs/event/asjs.Event.js" );

ASJS.MouseEvent = function( type ) {
	var that = new ASJS.Event( type );
	return that;
}
ASJS.MouseEvent.SCROLL			= "DOMMouseScroll mousewheel scroll";
ASJS.MouseEvent.CLICK			= "click";
ASJS.MouseEvent.DOUBLE_CLICK	= "dblclick";
ASJS.MouseEvent.MOUSE_DOWN		= "mousedown";
ASJS.MouseEvent.MOUSE_UP		= "mouseup";
ASJS.MouseEvent.MOUSE_LEAVE		= "mouseleave";
ASJS.MouseEvent.MOUSE_ENTER		= "mouseenter";
ASJS.MouseEvent.MOUSE_MOVE		= "mousemove";
ASJS.MouseEvent.MOUSE_OVER		= "mouseover";
ASJS.MouseEvent.MOUSE_OUT		= "mouseout";
ASJS.MouseEvent.TOUCH_START		= "touchstart";
ASJS.MouseEvent.TOUCH_END		= "touchend";
ASJS.MouseEvent.TOUCH_MOVE		= "touchmove";
ASJS.MouseEvent.CONTEXT_MENU	= "contextmenu";
ASJS.MouseEvent.SELECT_START	= "onselectstart";
