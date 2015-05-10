includeOnce( "js/normal/asjs/asjs.NotificationDispatcher.js" );

function AbstractMediator( view ) {
	var that = new ASJS.NotificationDispatcher();
	
	/* CONSTRUCTOR */{
		that.view = view;
	}
	
	return that;
}
