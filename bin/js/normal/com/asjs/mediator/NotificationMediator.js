includeOnce( "com/asjs/mediator/AbstractMediator.js" );
includeOnce( "com/asjs/view/NotificationView.js" );
includeOnce( "com/asjs/model/vo/NotificationDataVo.js" );

function NotificationMediator( view ) {
	var that = new AbstractMediator( view );
	var _notificationPool = [];
	var _showed = false;
	var _defaultOkLabel = "";
	var _defaultCancelLabel = "";
	var _notificationView = new NotificationView();
		
	that.handlers = [ ASJS.Stage.RESIZE, NotificationMediator.SHOW ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case NotificationMediator.SHOW: show( data );
			break;
		}
	}
	
	that.setDefault = function( okLabel, cancelLabel ) {
		_defaultOkLabel = okLabel;
		_defaultCancelLabel = cancelLabel;
	}
	
	function onResize() {
		if ( that.view.contains( _notificationView ) ) _notificationView.drawNow();
	}
	
	function show( data ) {
		if ( data == undefined ) data = new NotificationDataVo();
		
		if ( !data.okLabel ) data.okLabel = _defaultOkLabel;
		if ( !data.cancelLabel ) data.cancelLabel = _defaultCancelLabel;
		
		_notificationPool.push( data );
		
		if ( !_showed ) showWindow();
	}
	
	function hide() {
		if ( _notificationPool.length > 0 ) showWindow();
		else hideWindow();
	}
	
	function hideWindow() {
		$( _notificationView ).stop().animate( { alpha: 0 }, { duration: 500, complete: function() {
			_notificationView.hideWindow();
			that.view.removeChild( _notificationView );
			_showed = false;
			$( ".flash-content" ).css( "visibility", "visible" );
		}});
	}
	
	function showWindow() {
		$( ".flash-content" ).css( "visibility", "hidden" );
		var notificationItem = _notificationPool[ 0 ];
		_notificationPool.shift();
		_showed = true;
		_notificationView.showWindow( notificationItem );
		
		_notificationView.alpha = 0;
		if ( !that.view.contains( _notificationView ) ) that.view.addChild( _notificationView );
		onResize();
		$( _notificationView ).stop().animate( { alpha: 1 }, { duration: 500 } );
	}
	
	(function() {
		_notificationView.addEventListener( NotificationMediator.HIDE, function( event ) {
			hide();
		});
		
		that.registerNotificationHandlers();
	})();
	
	return that;
}
NotificationMediator.SHOW = "NotificationMediator-show";
NotificationMediator.HIDE = "NotificationMediator-hide";
