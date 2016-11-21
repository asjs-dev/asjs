includeOnce( "org/asjs/event/asjs.Event.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.EventDispatcher = function( tag ) {
	var that = {};
	
	that.jQuery = $( tag || "<div />" );
	
	property( that, "el", { get: function() { return that.jQuery[ 0 ]; } } );
	
	that.dispatchEvent = function( type, data, bubble ) {
		var eventBubble = bubble == undefined ? true : bubble;
		
		if ( eventBubble ) that.jQuery.trigger( type, data );
		else that.jQuery.triggerHandler( type, data );
	}
	
	that.addEventListener = function( type, callback ) {
		if ( type == ASJS.MouseEvent.SCROLL && that.jQuery == new ASJS.Window().instance.jQuery ) that.jQuery.scroll( callback );
		else that.jQuery.on( type, callback );
	}
	
	that.removeEventListeners = function() {
		that.jQuery.off();
	}
	
	that.removeEventListener = function( type, callback ) {
		that.jQuery.off( type, null, callback );
	}
	
	that.hasEventListener = function( which, handler ) {
		var events = $._data( that.el, "events" );
		if ( events == undefined ) return false;
		var w = which.indexOf( " " ) > -1 ? which.split( " " ) : [ which ];
		var i = -1;
		var l = w.length;
		while ( ++i < l ) {
			var event = events[ w[ i ] ];
			if ( event != undefined ) {
				var j = -1;
				var k = event.length;
				while ( ++j < k ) {
					if ( event[ j ].handler == handler ) return true;
				}
			}
		}
		return false;
	}
	
	return that;
};
