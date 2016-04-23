includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );
includeOnce( "com/asjs/mediator/ContentMediator.js" );
includeOnce( "com/asjs/mediator/PreloaderMediator.js" );
includeOnce( "com/asjs/mediator/NotificationMediator.js" );
includeOnce( "com/asjs/model/Language.js" );

function ViewPrepCommand() {
	var that = new ASJS.AbstractCommand();
	
	var _language = new Language().instance;
	
	that.execute = function( app ) {
		new ContentMediator( app.contentView );
		new PreloaderMediator( app.preloaderView );
	
		var notificationMediator = new NotificationMediator( app.notificationView );
		notificationMediator.setDefault( _language.getText( 'notification_ok_button' ), _language.getText( 'notification_cancel_button' ) );
		
		that.sendNotification( ContentMediator.SHOW );
	}
	
	return that;
}
