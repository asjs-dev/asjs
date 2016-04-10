includeOnce( "org/asjs/event/asjs.Event.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

ASJS.EventDispatcher = function( domElement ) {
	var that = {};
	
	that.dispatchEvent = function( type, data, bubble ) {
		var eventBubble = bubble == undefined ? true : bubble;
		
		if ( eventBubble ) that.domObject.trigger( type, data );
		else that.domObject.triggerHandler( type, data );
	}
	
	that.addEventListener = function( type, callback ) {
		if ( type == ASJS.MouseEvent.SCROLL && that.domObject == stage.window.domObject ) that.domObject.scroll( callback );
		else that.domObject.on( type, callback );
	}
	
	that.removeEventListeners = function() {
		that.domObject.off();
	}
	
	that.removeEventListener = function( type, callback ) {
		that.domObject.off( type, null, callback );
	}
	
	that.hasEventListener = function( which, handler ) {
		var events = $._data( that.domElement, "events" );
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
	
	that.domObject = $( domElement || "<div />" );
	
	return that;
};
