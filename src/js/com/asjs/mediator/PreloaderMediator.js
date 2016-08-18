includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "org/asjs/display/animation/asjs.Easing.js" );
includeOnce( "com/asjs/view/PreloaderView.js" );

function PreloaderMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _counter		= 0;
	var _preloaderView	= new PreloaderView();
	var _easingTarget	= { alpha: 0 };
	var _easing			= new ASJS.Easing();
	
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
			_preloaderView.alpha = 0;
			that.view.addChild( _preloaderView );
			
			animate( 0, 1 );
		}
	}
	
	function onHideAnimationComplete() {
		that.view.removeChild( _preloaderView );
	}
	
	function onHide() {
		_counter--;
		if ( _counter < 0 ) _counter = 0;
		if ( _counter == 0 && that.view.contains( _preloaderView ) ) {
			
			animate( 1, 0, onHideAnimationComplete );
		}
	}
	
	function animate( from, to, completeCallback ) {
		_easingTarget = { alpha: from };
		_easing.stop();
		_easing.play( _easingTarget, { alpha: to }, 1000, "easeInOutExpo",
			function() {
				_preloaderView.alpha = _easingTarget.alpha;
			},
			completeCallback
		);
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
PreloaderMediator.SHOW = "PreloaderMediator-show";
PreloaderMediator.HIDE = "PreloaderMediator-hide";
