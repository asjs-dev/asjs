includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );
includeOnce( "com/asjs/controller/command/startup/ConfigLoaderCommand.js" );
includeOnce( "com/asjs/controller/command/startup/LanguageLoaderCommand.js" );
includeOnce( "com/asjs/controller/command/startup/EnvironmentCommand.js" );
includeOnce( "com/asjs/controller/command/startup/ViewPrepCommand.js" );

function StartupCommand() {
	var that = new ASJS.AbstractCommand();
	
	that.execute = function( app ) {
		( new ConfigLoaderCommand() ).execute().done( function() {
			( new LanguageLoaderCommand() ).execute().done( function() {
				( new EnvironmentCommand() ).execute();
				( new ViewPrepCommand() ).execute( app );
			});
		});
	}
	
	return that;
}
