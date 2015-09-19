includeOnce( "js/normal/controller/command/AbstractCommand.js" );
includeOnce( "js/normal/Tools.js" );
includeOnce( "js/normal/model/Language.js" );
includeOnce( "js/normal/model/Cookies.js" );
includeOnce( "js/normal/asjs/utils/asjs.Cycler.js" );

function EnvironmentCommand() {
	var that = new AbstractCommand();
	
	var _language = new Language().instance;
	var _cookies = new Cookies().instance;
	var _tools = new Tools().instance;
	var _cycler = new ASJS.Cycler().instance;
	
	var _sleepToResizeId;
	
	that.execute = function() {
		var selectedLanguage = _tools.getURLParams( 'lang' );
		if ( selectedLanguage == undefined || _language.supportedLanguages.indexOf( selectedLanguage ) == -1 ) selectedLanguage = _cookies.readCookie( 'language' );
		if ( selectedLanguage == undefined || _language.supportedLanguages.indexOf( selectedLanguage ) == -1 ) selectedLanguage = _language.selectedLanguage;
		_language.selectedLanguage = selectedLanguage;

		_cookies.createCookie( 'language', _language.selectedLanguage );
		stage.title = _language.getText( "title" );

		_cycler.fps = 24;
		_cycler.start();

		stage.addEventListener( ASJS.Stage.RESIZE, function( event ) {
			window.clearTimeout( _sleepToResizeId );
			_sleepToResizeId = window.setTimeout( function() {
				that.sendNotification( ASJS.Stage.RESIZE );
				window.clearTimeout( _sleepToResizeId );
			}, 100 );
		});
	}
	
	return that;
}
