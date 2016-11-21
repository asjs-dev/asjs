ASJS.NotificationHandler = function() {
	return singleton( this, ASJS.NotificationHandler, function() {
		var that = {};
		var _notificationHandlers = {};
	
		that.register = function( notificationDispatcher ) {
			if ( !notificationDispatcher.handlers ) return;
			var i = -1;
			var l = notificationDispatcher.handlers.length;
			while ( ++i < l ) {
				var notificationType = notificationDispatcher.handlers[ i ];
				if ( !_notificationHandlers[ notificationType ] ) _notificationHandlers[ notificationType ] = [];
				_notificationHandlers[ notificationType ].push( notificationDispatcher );
			}
		}
	
		that.remove = function( notificationDispatcher ) {
			if ( !notificationDispatcher.handlers ) return;
			var i = -1;
			var l = notificationDispatcher.handlers ? notificationDispatcher.handlers.length : 0;
			while ( ++i < l ) {
				var notificationType = notificationDispatcher.handlers[ i ];
				if ( _notificationHandlers[ notificationType ] ) {
					var index = _notificationHandlers[ notificationType ].indexOf( notificationDispatcher );
					if ( index > -1 ) _notificationHandlers[ notificationType ].splice( index, 1 );
				}
			}
		}
	
		that.sendNotification = function( notificationType, data ) {
			var i = -1;
			var l = _notificationHandlers[ notificationType ] ? _notificationHandlers[ notificationType ].length : 0;
			var removeHandlers = [];
			while ( ++i < l ) {
				if ( _notificationHandlers[ notificationType ][ i ] ) {
					_notificationHandlers[ notificationType ][ i ].reciveNotification( notificationType, data );
				} else {
					_notificationHandlers[ notificationType ].splice( i, 1 );
					l--;
				}
			}
		}
		
		return that;
	});
}
