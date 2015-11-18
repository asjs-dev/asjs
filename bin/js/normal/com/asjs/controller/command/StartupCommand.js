includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );
includeOnce( "com/asjs/controller/command/startup/ConfigLoaderCommand.js" );
includeOnce( "com/asjs/controller/command/startup/LanguageLoaderCommand.js" );
includeOnce( "com/asjs/controller/command/startup/EnvironmentCommand.js" );
includeOnce( "com/asjs/controller/command/startup/ViewPrepCommand.js" );

function StartupCommand() {
	var that = new ASJS.AbstractCommand();
	
	var _app;
	
	that.execute = function( app ) {
		_app = app;
		loadConfig();
	}
	
	function loadConfig() {
		( new ConfigLoaderCommand() ).execute().done( loadLanguage );
	}
	
	function loadLanguage() {
		( new LanguageLoaderCommand() ).execute().done( initApplication );
	}
	
	function initApplication() {
		( new EnvironmentCommand() ).execute();
		( new ViewPrepCommand() ).execute( _app );
	}
	
	return that;
}
