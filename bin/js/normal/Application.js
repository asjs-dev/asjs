includeOnce( "js/normal/asjs/asjs.Main.js" );
includeOnce( "js/normal/asjs/asjs.Stage.js" );
includeOnce( "js/normal/asjs/asjs.Sprite.js" );
includeOnce( "js/normal/asjs/asjs.NotificationDispatcher.js" );
includeOnce( "js/normal/Tools.js" );
includeOnce( "js/normal/controller/command/StartupCommand.js" );
includeOnce( "js/normal/model/Config.js" );
includeOnce( "js/normal/model/Language.js" );
includeOnce( "js/normal/mediator/ContentMediator.js" );
includeOnce( "js/normal/mediator/PreloaderMediator.js" );
includeOnce( "js/normal/mediator/NotificationMediator.js" );

function Application() {
	var that = new ASJS.NotificationDispatcher();
	
	var _contentView =		new ASJS.Sprite();
	var _preloaderView =	new ASJS.Sprite();
	var _notificationView =	new ASJS.Sprite();
	
	/* CONSTRUCTOR */{
		stage.addChild( _contentView );
		stage.addChild( _preloaderView );
		stage.addChild( _notificationView );

		new ContentMediator( _contentView );
		new PreloaderMediator( _preloaderView );
		
		var notificationMediator = new NotificationMediator( _notificationView );
		notificationMediator.setDefault( language.getText( 'notification_ok_button' ), language.getText( 'notification_cancel_button' ) );
		
		( new StartupCommand() ).execute();
	}
	
	return that;
};

var stage;
var tools;
var config;
var language;

$( document ).ready( function() {
	stage =		new ASJS.Stage().instance;
	tools =		new Tools().instance;
	config =	new Config().instance;
	language =	new Language().instance;
	
	$.get( "json/language.json", function( response ) {
		language.data = response;
		var application = new Application();
	});
});
