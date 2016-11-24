includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );
includeOnce( "com/asjs/tools/Tools.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/Config.js" );
includeOnce( "com/asjs/model/Cookies.js" );
includeOnce( "org/asjs/utils/asjs.Cycler.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

function EnvironmentCommand() {
	var that = new ASJS.AbstractCommand();
	
	var _window = new ASJS.Window();
	
	var _language	= new Language();
	var _cookies	= new Cookies();
	var _cycler		= new ASJS.Cycler();
	var _config		= new Config();
	
	var _sleepToResizeId;
	
	that.execute = function() {
		setupLanguage();
		setupCycler();
		setupStage();
	}
	
	function setupLanguage() {
		var selectedLanguage = Tools.getURLParams( 'lang' );
		if ( selectedLanguage == undefined || _language.supportedLanguages.indexOf( selectedLanguage ) == -1 ) selectedLanguage = _cookies.readCookie( 'language' );
		if ( selectedLanguage == undefined || _language.supportedLanguages.indexOf( selectedLanguage ) == -1 ) selectedLanguage = _language.selectedLanguage;
		_language.selectedLanguage = selectedLanguage;

		_cookies.createCookie( 'language', _language.selectedLanguage );
		stage.title = _language.getText( "title" );
	}
	
	function setupCycler() {
		_cycler.fps = _config.get( "fps" );
		_cycler.start();
	}
	
	function setupStage() {
		stage.addEventListener( ASJS.Stage.RESIZE, onStageResize );
	}
	
	function onStageResize( event ) {
		_sleepToResizeId = _window.clearTimeout( _sleepToResizeId );
		_sleepToResizeId = _window.setTimeout( onTimeout, _config.get( "resizeInterval" ) );
	}
	
	function onTimeout() {
		_sleepToResizeId = _window.clearTimeout( _sleepToResizeId );
		that.sendNotification( ASJS.Stage.RESIZE );
	}
	
	return that;
}
