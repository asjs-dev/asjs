includeOnce( "js/normal/asjs/asjs.Main.js" );
includeOnce( "js/normal/asjs/display/asjs.Stage.js" );
includeOnce( "js/normal/asjs/display/asjs.Sprite.js" );
includeOnce( "js/normal/controller/command/StartupCommand.js" );

function Application() {
	var that = {};
	
	var _contentView =		new ASJS.Sprite();
	var _preloaderView =	new ASJS.Sprite();
	var _notificationView =	new ASJS.Sprite();
	
	defineProperty( that, "contentView", {
		get: function() { return _contentView; }
	});
	
	defineProperty( that, "preloaderView", {
		get: function() { return _preloaderView; }
	});
	
	defineProperty( that, "notificationView", {
		get: function() { return _notificationView; }
	});
	
	(function() {
		console.log( "<AS/JS> Application" );
		
		stage.addChild( _contentView );
		stage.addChild( _preloaderView );
		stage.addChild( _notificationView );
		
		( new StartupCommand() ).execute( that );
	})();
	
	return that;
};

ASJS.startASJS( Application );
