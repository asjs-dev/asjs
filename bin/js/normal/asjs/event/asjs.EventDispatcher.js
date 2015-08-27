includeOnce( "js/normal/asjs/event/asjs.Event.js" );

ASJS.EventDispatcher = function( domElement ) {
	var that = {};
	
	that.dispatchEvent = function( type, data ) {
		that.domObject.trigger( type, data );
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
