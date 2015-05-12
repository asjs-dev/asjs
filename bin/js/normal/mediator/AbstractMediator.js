includeOnce( "js/normal/asjs/mvc/asjs.NotificationDispatcher.js" );

function AbstractMediator( view ) {
	var that = new ASJS.NotificationDispatcher();
	
	(function() {
		that.view = view;
	})();
	
	return that;
}
