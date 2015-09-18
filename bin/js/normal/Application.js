includeOnce( "js/normal/asjs/asjs.Main.js" );
includeOnce( "js/normal/asjs/display/asjs.Stage.js" );
includeOnce( "js/normal/asjs/display/asjs.Sprite.js" );
includeOnce( "js/normal/asjs/net/asjs.Loader.js" );
includeOnce( "js/normal/asjs/event/asjs.LoaderEvent.js" );
includeOnce( "js/normal/controller/command/StartupCommand.js" );
includeOnce( "js/normal/model/Language.js" );
includeOnce( "js/normal/mediator/ContentMediator.js" );
includeOnce( "js/normal/mediator/PreloaderMediator.js" );
includeOnce( "js/normal/mediator/NotificationMediator.js" );

function Application() {
	var that = {};
	
	var _language = new Language().instance;
	
	var _contentView =		new ASJS.Sprite();
	var _preloaderView =	new ASJS.Sprite();
	var _notificationView =	new ASJS.Sprite();
	
	function init() {
		stage.addChild( _contentView );
		stage.addChild( _preloaderView );
		stage.addChild( _notificationView );

		new ContentMediator( _contentView );
		new PreloaderMediator( _preloaderView );
	
		var notificationMediator = new NotificationMediator( _notificationView );
		notificationMediator.setDefault( _language.getText( 'notification_ok_button' ), _language.getText( 'notification_cancel_button' ) );
	
		( new StartupCommand() ).execute();
	}
	
	(function() {
		var loader = new ASJS.Loader();
			loader.requestType = "GET";
			loader.addEventListener( ASJS.LoaderEvent.LOAD_END, function( event ) {
				loader.removeEventListeners();
				_language.data = loader.content;
				init();
			});
			loader.load( "json/language.json" );
	})();
	
	return that;
};

ASJS.startASJS( Application );
