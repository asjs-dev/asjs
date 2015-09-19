includeOnce( "js/normal/controller/command/AbstractCommand.js" );
includeOnce( "js/normal/controller/command/startup/ConfigLoaderCommand.js" );
includeOnce( "js/normal/controller/command/startup/LanguageLoaderCommand.js" );
includeOnce( "js/normal/controller/command/startup/EnvironmentCommand.js" );
includeOnce( "js/normal/controller/command/startup/ViewPrepCommand.js" );

function StartupCommand() {
	var that = new AbstractCommand();
	
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
