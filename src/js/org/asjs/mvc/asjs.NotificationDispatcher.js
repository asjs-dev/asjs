includeOnce( "org/asjs/mvc/asjs.NotificationHandler.js" );

ASJS.NotificationDispatcher = function() {
	var that = {};
	
	var _notificationHandler = new ASJS.NotificationHandler().instance;
	
	that.handlers = [];
	
	that.destruct = function() {
		that.removeNotificationHandlers();
		that = null;
	};
	
	that.sendNotification = function( notificationType, data ) {
		_notificationHandler.sendNotification( notificationType, data );
	}
	
	that.reciveNotification = function( notificationType, data ) {}
	
	that.registerNotificationHandlers = function() {
		_notificationHandler.register( that );
	}
	
	that.removeNotificationHandlers = function() {
		_notificationHandler.remove( that );
	}
	
	return that;
}
