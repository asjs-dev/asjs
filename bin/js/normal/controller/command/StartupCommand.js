includeOnce( "js/normal/controller/command/AbstractCommand.js" );
includeOnce( "js/normal/mediator/PreloaderMediator.js" );
includeOnce( "js/normal/model/Language.js" );
includeOnce( "js/normal/model/Cookies.js" );

function StartupCommand() {
	var that = new AbstractCommand();
	
	var _language = new Language().instance;
	var _cookies = new Cookies().instance;
	
	that.execute = function() {
		that.sendNotification( PreloaderMediator.SHOW );
		
		_cookies.createCookie( 'language', _language.selectedLanguage );
		document.title = _language.getText( "title" );
		
		that.sendNotification( AbstractMediator.RESIZE );
		
		stage.window.resize( function( event ) {
			that.sendNotification( AbstractMediator.RESIZE );
		});
		
		that.sendNotification( PreloaderMediator.HIDE );
	}
	
	/* CONSTRUCTOR */{}
	
	return that;
}
