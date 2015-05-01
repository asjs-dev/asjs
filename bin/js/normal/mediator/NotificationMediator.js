includeOnce( "js/normal/mediator/AbstractMediator.js" );
includeOnce( "js/normal/view/NotificationView.js" );

function NotificationMediator( view ) {
	var that = new AbstractMediator( view );
	var _notificationPool = [];
	var _showed = false;
	var _defaultOkLabel = "";
	var _defaultCancelLabel = "";
	var _notificationView = new NotificationView();
		
	that.handlers = [ AbstractMediator.RESIZE, NotificationMediator.SHOW ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case AbstractMediator.RESIZE: onResize();
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
		if ( data == undefined ) data = {};
		
		_notificationPool.push({
			title: data.title || "",
			content: data.content || "",
			showOk: data[ 'showOk' ] != undefined ? data[ 'showOk' ] : true,
			showCancel: data[ 'showCancel' ] != undefined ? data[ 'showCancel' ] : false,
			okCallback: data[ 'okCallback' ],
			cancelCallback: data[ 'cancelCallback' ],
			okLabel: data[ 'okLabel' ] || _defaultOkLabel,
			cancelLabel: data[ 'cancelLabel' ]  || _defaultCancelLabel,
			width: data[ 'width' ]  || 500,
			height: data[ 'height' ]  || 200
		});
		
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
	
	/* CONSTRUCTOR */{
		_notificationView.addEventListener( NotificationMediator.HIDE, function( event ) {
			hide();
		});
		
		that.registerNotificationHandlers();
	}
	
	return that;
}
NotificationMediator.SHOW = "NotificationMediator-show";
NotificationMediator.HIDE = "NotificationMediator-hide";
