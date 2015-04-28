includeOnce( "js/normal/controller/command/AbstractCommand.js" );
includeOnce( "js/normal/Tools.js" );
includeOnce( "js/normal/model/Language.js" );
includeOnce( "js/normal/mediator/PreloaderMediator.js" );

function StartupCommand() {
	var that = new AbstractCommand();
	
	that.execute = function() {
		that.sendNotification( PreloaderMediator.SHOW );
		
		tools.createCookie( 'language', language.selectedLanguage );
		document.title = language.getText( "title" );
		
		that.sendNotification( AbstractMediator.RESIZE );
		
		stage.window.resize( function( event ) {
			that.sendNotification( AbstractMediator.RESIZE );
		});
		
		that.sendNotification( PreloaderMediator.HIDE );
	}
	
	/* CONSTRUCTOR */{}
	
	return that;
}
