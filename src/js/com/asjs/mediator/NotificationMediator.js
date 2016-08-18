includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "org/asjs/display/animation/asjs.Easing.js" );
includeOnce( "com/asjs/view/NotificationView.js" );
includeOnce( "com/asjs/model/vo/NotificationDataVo.js" );

function NotificationMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _notificationPool	= [];
	var _showed				= false;
	var _defaultOkLabel		= "";
	var _defaultCancelLabel	= "";
	var _notificationView	= new NotificationView();
	var _easingTarget		= { alpha: 0 };
	var _easing				= new ASJS.Easing();
		
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
	
	function hideWindowAnimationComplete() {
		_notificationView.hideWindow();
		that.view.removeChild( _notificationView );
		_showed = false;
	}
	
	function hideWindow() {
		animate( 1, 0, hideWindowAnimationComplete );
	}
	
	function showWindow() {
		var notificationItem = _notificationPool[ 0 ];
		_notificationPool.shift();
		_showed = true;
		_notificationView.showWindow( notificationItem );
		
		_notificationView.alpha = 0;
		if ( !that.view.contains( _notificationView ) ) that.view.addChild( _notificationView );
		onResize();
		
		animate( 0, 1 );
	}
	
	function animate( from, to, completeCallback ) {
		_easingTarget = { alpha: from };
		_easing.stop();
		_easing.play( _easingTarget, { alpha: to }, 1000, "easeInOutExpo",
			function() {
				_notificationView.alpha = _easingTarget.alpha;
			},
			completeCallback
		);
	}
	
	(function() {
		_notificationView.addEventListener( NotificationMediator.HIDE, hide );
		that.registerNotificationHandlers();
	})();
	
	return that;
}
NotificationMediator.SHOW = "NotificationMediator-show";
NotificationMediator.HIDE = "NotificationMediator-hide";
