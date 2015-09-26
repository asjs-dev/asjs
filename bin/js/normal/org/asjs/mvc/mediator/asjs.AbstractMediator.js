includeOnce( "org/asjs/mvc/asjs.NotificationDispatcher.js" );

ASJS.AbstractMediator = function( view ) {
	var that = new ASJS.NotificationDispatcher();
	
	(function() {
		that.view = view;
	})();
	
	return that;
}
