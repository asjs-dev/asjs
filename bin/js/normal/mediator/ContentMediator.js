includeOnce( "js/normal/mediator/AbstractMediator.js" );
includeOnce( "js/normal/mediator/NotificationMediator.js" );
includeOnce( "js/normal/view/ContentView.js" );
includeOnce( "js/normal/model/Language.js" );
includeOnce( "js/normal/model/vo/NotificationDataVo.js" );

function ContentMediator( view ) {
	var that = new AbstractMediator( view );
	
	var _language = new Language().instance;
	
	var _contentView = new ContentView();
	
	that.handlers = [ ASJS.Stage.RESIZE, ContentMediator.SHOW ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case ContentMediator.SHOW: onShow();
			break;
		}
	}
	
	function onResize() {
		_contentView.setSize( stage.stageWidth, stage.stageHeight );
		_contentView.drawNow();
	}
	
	function onShow() {
		_contentView.addEventListener( ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK, function() {
			var notificationDataVo = new NotificationDataVo();
				notificationDataVo.title = _language.getText( "notification_title" );
				notificationDataVo.content = _language.getText( "notification_content" );
			that.sendNotification( NotificationMediator.SHOW, notificationDataVo );
		});
		that.view.addChild( _contentView );
	
		onResize();
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
ContentMediator.SHOW								= "ContentMediator-show";
ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK	= "ContentMediator-onShowNotificationWindowClick";
