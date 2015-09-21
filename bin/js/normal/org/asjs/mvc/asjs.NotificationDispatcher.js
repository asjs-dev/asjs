includeOnce( "org/asjs/mvc/asjs.NotificationHandler.js" );

ASJS.NotificationDispatcher = function() {
	var that = {};
	
	that.handlers = [];
	
	that.destruct = function() {
		that.removeNotificationHandlers();
		that = null;
	};
	
	that.sendNotification = function( notificationType, data ) {
		new ASJS.NotificationHandler().instance.sendNotification( notificationType, data );
	}
	
	that.reciveNotification = function( notificationType, data ) {}
	
	that.registerNotificationHandlers = function() {
		new ASJS.NotificationHandler().instance.register( that );
	}
	
	that.removeNotificationHandlers = function() {
		new ASJS.NotificationHandler().instance.remove( that );
	}
	
	return that;
}
