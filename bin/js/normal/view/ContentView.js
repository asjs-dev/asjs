includeOnce( "js/normal/asjs/display/asjs.Sprite.js" );
includeOnce( "js/normal/asjs/display/asjs.Label.js" );
includeOnce( "js/normal/asjs/display/form/asjs.Button.js" );
includeOnce( "js/normal/asjs/display/animation/asjs.AnimationDescriptor.js" );
includeOnce( "js/normal/asjs/display/animation/asjs.AnimatedSprite.js" );
includeOnce( "js/normal/asjs/geom/asjs.Rectangle.js" );
includeOnce( "js/normal/asjs/geom/asjs.Point.js" );
includeOnce( "js/normal/asjs/utils/asjs.Cycler.js" );
includeOnce( "js/normal/mediator/ContentMediator.js" );
includeOnce( "js/normal/model/Language.js" );
includeOnce( "js/normal/asjs/event/asjs.MouseEvent.js" );

function ContentView() {
	var that = new ASJS.Sprite();
	
	var _language = new Language().instance;
	var _cycler = new ASJS.Cycler().instance;
	
	var _background = new ASJS.Sprite();
	var _box = new ASJS.Sprite();
	var _label = new ASJS.Label();
	var _button = new ASJS.Button();
	var _animatedSprite = new ASJS.AnimatedSprite();
	
	that.drawNow = function() {
		_box.x = ( that.width - _box.width ) * 0.5;
	}
	
	function addedToStage() {
		that.removeEventListener( ASJS.Stage.ADDED_TO_STAGE, addedToStage );
		console.log( "view.stage: " + that.stage );
	}
	
	(function() {
		that.addEventListener( ASJS.Stage.ADDED_TO_STAGE, addedToStage );
	
		_background.addClass( "background" );
		_background.setCSS( "position", "fixed" );
		_background.setSize( "100%", "100%" );
		_background.alpha = 0.5;
		that.addChild( _background );
		
		_box.addClass( "box" );
		_box.setSize( 320, 130 );
		_box.y = 100;
		that.addChild( _box );
		
		_label.text = _language.getText( "new_asjs_base_site" );
		_label.addClass( "box_label" );
		_label.setSize( 320, 30 );
		_label.move( 0, 34 );
		_box.addChild( _label );
		
		_button.label = _language.getText( "show_notification_window" );
		_button.addClass( "box_button" );
		_button.setSize( 320, 40 );
		_button.move( 0, _box.height - _button.height );
		_button.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK );
		});
		_box.addChild( _button );
		
		_animatedSprite.addAnimationDescriptorList([
			new ASJS.AnimationDescriptor( "explode", "images/explosion.png", new ASJS.Point( 768, 512 ), [
				new ASJS.Rectangle( 0, 0, 256, 128 ),
				new ASJS.Rectangle( 256, 0, 256, 128 ),
				new ASJS.Rectangle( 512, 0, 256, 128 ),
				new ASJS.Rectangle( 0, 128, 256, 128 ),
				new ASJS.Rectangle( 256, 128, 256, 128 ),
				new ASJS.Rectangle( 512, 128, 256, 128 ),
				new ASJS.Rectangle( 0, 256, 256, 128 ),
				new ASJS.Rectangle( 256, 256, 256, 128 ),
				new ASJS.Rectangle( 512, 256, 256, 128 ),
				new ASJS.Rectangle( 0, 384, 256, 128 ),
				new ASJS.Rectangle( 256, 384, 256, 128 ),
				new ASJS.Rectangle( 512, 384, 256, 128 )
			]),
			new ASJS.AnimationDescriptor( "fireworks", "images/triple03_sheet.png", new ASJS.Point( 1600, 600 ), [
				new ASJS.Rectangle( 0, 0, 200, 200 ),
				new ASJS.Rectangle( 200, 0, 200, 200 ),
				new ASJS.Rectangle( 400, 0, 200, 200 ),
				new ASJS.Rectangle( 600, 0, 200, 200 ),
				new ASJS.Rectangle( 800, 0, 200, 200 ),
				new ASJS.Rectangle( 1000, 0, 200, 200 ),
				new ASJS.Rectangle( 1200, 0, 200, 200 ),
				new ASJS.Rectangle( 1400, 0, 200, 200 ),
				new ASJS.Rectangle( 0, 200, 200, 200 ),
				new ASJS.Rectangle( 200, 200, 200, 200 ),
				new ASJS.Rectangle( 400, 200, 200, 200 ),
				new ASJS.Rectangle( 600, 200, 200, 200 ),
				new ASJS.Rectangle( 800, 200, 200, 200 ),
				new ASJS.Rectangle( 1000, 200, 200, 200 ),
				new ASJS.Rectangle( 1200, 200, 200, 200 ),
				new ASJS.Rectangle( 1400, 200, 200, 200 ),
				new ASJS.Rectangle( 0, 400, 200, 200 ),
				new ASJS.Rectangle( 200, 400, 200, 200 ),
				new ASJS.Rectangle( 400, 400, 200, 200 ),
				new ASJS.Rectangle( 600, 400, 200, 200 ),
				new ASJS.Rectangle( 800, 400, 200, 200 ),
				new ASJS.Rectangle( 1000, 400, 200, 200 ),
				new ASJS.Rectangle( 1200, 400, 200, 200 ),
				new ASJS.Rectangle( 1400, 400, 200, 200 )
			])
		]);
		
		_animatedSprite.move( 10, 10 );
		that.addChild( _animatedSprite );
		
		_animatedSprite.setSize( 200, 200 );
		_animatedSprite.play( "fireworks" );
		
		_animatedSprite.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			if ( Math.round( Math.random() * 1 ) == 0 ) {
				_animatedSprite.setSize( 256, 128 );
				_animatedSprite.play( "explode" );
			} else {
				_animatedSprite.setSize( 200, 200 );
				_animatedSprite.play( "fireworks" );
			}
		});
		
		that.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			var mouse = new ASJS.Mouse().instance;
			console.log( "_box.hitTest: " + _box.hitTest( new ASJS.Point( mouse.mouseX, mouse.mouseY ) ) );
		});
		
		_cycler.addCallback( _animatedSprite.update );
	})();
	
	return that;
}
