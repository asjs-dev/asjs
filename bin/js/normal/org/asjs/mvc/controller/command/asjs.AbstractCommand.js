includeOnce( "org/asjs/mvc/asjs.NotificationDispatcher.js" );

ASJS.AbstractCommand = function() {
	var that = new ASJS.NotificationDispatcher();
	
	that.execute = function() {}
	
	return that;
}
