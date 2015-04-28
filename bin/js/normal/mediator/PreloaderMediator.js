includeOnce( "js/normal/mediator/AbstractMediator.js" );
includeOnce( "js/normal/view/PreloaderView.js" );

function PreloaderMediator( view ) {
	var that = new AbstractMediator( view );
	var _counter = 0;
	var _preloaderView = new PreloaderView();
	
	that.handlers = [ PreloaderMediator.SHOW, PreloaderMediator.HIDE ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case PreloaderMediator.SHOW: onShow();
			break;
			case PreloaderMediator.HIDE: onHide();
			break;
		}
	}
	
	function onShow() {
		_counter++;
		if ( _counter == 1 && !that.view.contains( _preloaderView ) ) {
			$( ".flash-content" ).css( "visibility", "hidden" );
			_preloaderView.alpha = 0;
			that.view.addChild( _preloaderView );
			$( _preloaderView ).stop().animate( { alpha: 1 }, { duration: 500 } );
		}
	}
	
	function onHide() {
		_counter--;
		if ( _counter < 0 ) _counter = 0;
		if ( _counter == 0 && that.view.contains( _preloaderView ) ) {
			$( _preloaderView ).stop().animate( { alpha: 0 }, { duration: 500, complete: function() {
				that.view.removeChild( _preloaderView );
				$( ".flash-content" ).css( "visibility", "visible" );
			}});
		}
	}
	
	/* CONSTRUCTOR */{
		that.registerNotificationHandlers();
	}
	
	return that;
}
PreloaderMediator.SHOW = "PreloaderMediator-show";
PreloaderMediator.HIDE = "PreloaderMediator-hide";
