ASJS.NotificationHandler = function() {
	function NotificationHandlerInstance() {
		var that = {};
		var _notificationHandlers = {};
	
		that.register = function( notificationDispatcher ) {
			if ( !notificationDispatcher.handlers ) return;
			var i;
			var l = notificationDispatcher.handlers.length;
			var notificationType;
			for ( i = 0; i < l; i++ ) {
				notificationType = notificationDispatcher.handlers[ i ];
				if ( !_notificationHandlers[ notificationType ] ) _notificationHandlers[ notificationType ] = [];
				_notificationHandlers[ notificationType ].push( notificationDispatcher );
			}
		}
	
		that.remove = function( notificationDispatcher ) {
			if ( !notificationDispatcher.handlers ) return;
			var i;
			var l = notificationDispatcher.handlers ? notificationDispatcher.handlers.length : 0;
			var notificationType;
			for ( i = 0; i < l; i++ ) {
				notificationType = notificationDispatcher.handlers[ i ];
				if ( _notificationHandlers[ notificationType ] ) {
					var index = _notificationHandlers[ notificationType ].indexOf( notificationDispatcher );
					if ( index > -1 ) _notificationHandlers[ notificationType ].splice( index, 1 );
				}
			}
		}
	
		that.sendNotification = function( notificationType, data ) {
			var i;
			var l = _notificationHandlers[ notificationType ] ? _notificationHandlers[ notificationType ].length : 0;
			var removeHandlers = [];
			for ( i = 0; i < l; i++ ) {
				if ( _notificationHandlers[ notificationType ][ i ] ) {
					_notificationHandlers[ notificationType ][ i ].reciveNotification( notificationType, data );
				} else {
					_notificationHandlers[ notificationType ].splice( i, 1 );
					l--;
				}
			}
		}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !ASJS.NotificationHandler.$ ) ASJS.NotificationHandler.$ = new NotificationHandlerInstance();
			return ASJS.NotificationHandler.$;
		}
	});
}
