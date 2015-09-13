includeOnce( "js/normal/asjs/event/asjs.Event.js" );

ASJS.EventDispatcher = function( domElement ) {
	var that = {};
	
	that.dispatchEvent = function( type, data, bubble ) {
		bubble = bubble == undefined ? true : bubble;
		if ( bubble ) that.domObject.trigger( type, data );
		else that.domObject.triggerHandler( type, data );
	}
	
	that.addEventListener = function( type, callback ) {
		that.domObject.on( type, callback );
	}
	
	that.removeEventListeners = function() {
		that.domObject.off();
	}
	
	that.removeEventListener = function( type ) {
		that.domObject.off( type );
	}
	
	that.domObject = $( domElement || "<div />" );
	
	return that;
};
