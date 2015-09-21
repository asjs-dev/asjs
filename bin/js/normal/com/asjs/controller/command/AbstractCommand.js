includeOnce( "org/asjs/mvc/asjs.NotificationDispatcher.js" );

function AbstractCommand() {
	var that = new ASJS.NotificationDispatcher();
	
	that.execute = function() {}
	
	return that;
}
