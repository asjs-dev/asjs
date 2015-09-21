includeOnce( "org/asjs/display/form/asjs.Button.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/asjs.Scale9Grid.js" );
includeOnce( "org/asjs/geom/asjs.Point.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

function NotificationView() {
	var that = new ASJS.Sprite();
	
	var _notificationItem = {};
	var _window = new ASJS.Scale9Grid();
	var _title = new ASJS.Sprite();
	var _content = new ASJS.Sprite();
	var _okButton = new ASJS.Button();
	var _cancelButton = new ASJS.Button();
	
	that.hideWindow = function() {
		_title.html = "";
		_content.html = "";
		
		if ( that.contains( _okButton ) ) that.removeChild( _okButton );
		_okButton.label = "";
		
		if ( that.contains( _cancelButton ) ) that.removeChild( _cancelButton );
		_cancelButton.label = "";
	}
	
	that.showWindow = function( notificationItem ) {
		_notificationItem = notificationItem;
		
		_title.html = _notificationItem.title;
		_content.html = _notificationItem.content;
		
		if ( _notificationItem[ 'showOk' ] ) {
			_okButton.label = _notificationItem[ 'okLabel' ];
			if ( !that.contains( _okButton ) ) that.addChild( _okButton );
		} else if ( that.contains( _okButton ) ) that.removeChild( _okButton );
		
		if ( _notificationItem[ 'showCancel' ] ) {
			_cancelButton.label = _notificationItem[ 'cancelLabel' ];
			if ( !that.contains( _cancelButton ) ) that.addChild( _cancelButton );
		} else if ( that.contains( _cancelButton ) ) that.removeChild( _cancelButton );
	}
	
	that.drawNow = function() {
		_window.setSize( Math.max( 150, Math.min( that.width, _notificationItem.width ) ), Math.max( 150, Math.min( that.height, _notificationItem.height ) ) );
		_window.move( ( that.width - _window.width ) * 0.5, Math.max( 0, ( that.height - _window.height ) * 0.5 ) );
		
		_title.move( _window.x + 25, _window.y + 10 );
		_title.width = _window.width - 50;
		
		_content.move( _title.x, _title.y + _title.height + 25 );
		_content.setSize( _title.width, _window.height - _title.height - 55 - ( that.contains( _okButton ) || that.contains( _cancelButton ) ? 40 : 0 ) );
		if ( _content.drawNow ) _content.drawNow();
		
		_okButton.width = _window.width * 0.5 - 20;
		if ( that.contains( _okButton ) ) {
			_okButton.x = _window.x + ( that.contains( _cancelButton ) ? _window.width * 0.5 - 10 - _okButton.width : ( ( _window.width - _okButton.width ) * 0.5 ) );
			_okButton.y = _window.y + _window.height - _okButton.height - 30;
		}
		
		_cancelButton.width = _okButton.width;
		if ( that.contains( _cancelButton ) ) {
			_cancelButton.x = _window.x + ( that.contains( _okButton ) ? _window.width * 0.5 + 10 : ( ( _window.width - _cancelButton.width ) * 0.5 ) );
			_cancelButton.y = _window.y + _window.height - _cancelButton.height - 30;
		}
	}
	
	function drawButtonStyle( target ) {
		target.addClass( "notification_button" );
		target.height = 42;
	}
	
	(function() {
		that.setCSS( "background-color", "rgba( 0, 0, 0, 0.4 )" );
		that.setSize( "100%", "100%" );
		that.setCSS( "position", "fixed" );
		
		//_window.setCSS( "background-color", "#8b8a7b" );
		_window.size = new ASJS.Point( 30, 80 );
		_window.rect = new ASJS.Rectangle( 13, 60, 4, 7 );
		_window.backgroundImage = "images/window.png";
		that.addChild( _window );
	
		_title.height = 50;
		that.addChild( _title );
		_title.setCSS( "line-height", _title.height + "px" );
		_title.addClass( "notification_title" );
	
		_content.addClass( "notification_content" );
		that.addChild( _content );
	
		_okButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( NotificationMediator.HIDE );
			if ( _notificationItem[ 'okCallback' ] != undefined ) _notificationItem[ 'okCallback' ]();
		});
		drawButtonStyle( _okButton );
	
		_cancelButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( NotificationMediator.HIDE );
			if ( _notificationItem[ 'cancelCallback' ] != undefined ) _notificationItem[ 'cancelCallback' ]();
		});
		drawButtonStyle( _cancelButton );
	})();
	
	return that;
}
