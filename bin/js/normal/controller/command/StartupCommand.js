includeOnce( "js/normal/controller/command/AbstractCommand.js" );
includeOnce( "js/normal/mediator/PreloaderMediator.js" );
includeOnce( "js/normal/mediator/ContentMediator.js" );
includeOnce( "js/normal/model/Language.js" );
includeOnce( "js/normal/model/Cookies.js" );
includeOnce( "js/normal/asjs/asjs.Cycler.js" );

function StartupCommand() {
	var that = new AbstractCommand();
	
	var _language = new Language().instance;
	var _cookies = new Cookies().instance;
	var _cycler = new ASJS.Cycler().instance;
	
	var _sleepToResizeId;
	
	that.execute = function() {
		that.sendNotification( PreloaderMediator.SHOW );
		
		_cookies.createCookie( 'language', _language.selectedLanguage );
		document.title = _language.getText( "title" );
		
		var cycler = new ASJS.Cycler().instance;
			cycler.fps = 24;
			cycler.start();
			
		that.sendNotification( ContentMediator.SHOW );
		
		that.sendNotification( AbstractMediator.RESIZE );
		
		stage.window.resize( function( event ) {
			window.clearTimeout( _sleepToResizeId );
			_sleepToResizeId = window.setTimeout( function() {
				that.sendNotification( AbstractMediator.RESIZE );
				window.clearTimeout( _sleepToResizeId );
			}, 100 );
		});
		that.sendNotification( PreloaderMediator.HIDE );
	}
	
	/* CONSTRUCTOR */{}
	
	return that;
}
