sourcePath( "./" );

includeOnce( "org/asjs/asjs.Main.js" );
includeOnce( "org/asjs/display/asjs.Stage.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "com/asjs/controller/command/StartupCommand.js" );

function Application() {
	var that = {};
	
	var _contentView =		new ASJS.Sprite();
	var _preloaderView =	new ASJS.Sprite();
	var _notificationView =	new ASJS.Sprite();
	
	property( that, "contentView", { get: function() { return _contentView; } } );
	property( that, "preloaderView", { get: function() { return _preloaderView; } } );
	property( that, "notificationView", { get: function() { return _notificationView; } } );
	
	(function() {
		trace( "<AS/JS> Application" );
		
		stage.addChild( that.contentView );
		stage.addChild( that.preloaderView );
		stage.addChild( that.notificationView );
		
		( new StartupCommand() ).execute( that );
	})();
	
	return that;
};

ASJS.start( Application );
