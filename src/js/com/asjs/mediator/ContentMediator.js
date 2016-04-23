includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/asjs/mediator/NotificationMediator.js" );
includeOnce( "com/asjs/view/ContentView.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/vo/NotificationDataVo.js" );
includeOnce( "com/asjs/model/proxy/DataProxy.js" );

function ContentMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _dataProxy	= new DataProxy().instance;
	var _language	= new Language().instance;
	
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
	
	function onLoadAnimation( data ) {
		_contentView.init( data );
		that.view.addChild( _contentView );
	}
	
	function onShow() {
		_contentView.addEventListener( ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK, function() {
			var notificationDataVo = new NotificationDataVo();
				notificationDataVo.title = _language.getText( "notification_title" );
				notificationDataVo.content = _language.getText( "notification_content" );
			that.sendNotification( NotificationMediator.SHOW, notificationDataVo );
		});
		
		_dataProxy.loadAnimation( "json/animation/contentAnimation.json" ).done( onLoadAnimation );
	
		onResize();
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
ContentMediator.SHOW								= "ContentMediator-show";
ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK	= "ContentMediator-onShowNotificationWindowClick";
