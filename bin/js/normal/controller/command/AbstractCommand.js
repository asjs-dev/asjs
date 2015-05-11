function AbstractCommand() {
	var that = new ASJS.NotificationDispatcher();
	
	that.execute = function() {}
	
	return that;
}
