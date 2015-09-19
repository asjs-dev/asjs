includeOnce( "js/normal/controller/command/AbstractCommand.js" );
includeOnce( "js/normal/mediator/ContentMediator.js" );
includeOnce( "js/normal/mediator/PreloaderMediator.js" );
includeOnce( "js/normal/mediator/NotificationMediator.js" );
includeOnce( "js/normal/model/Language.js" );

function ViewPrepCommand() {
	var that = new AbstractCommand();
	
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
