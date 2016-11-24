includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/event/asjs.WindowEvent.js" );
includeOnce( "org/asjs/utils/asjs.Mouse.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.Stage = function() {
	return singleton( ASJS.Stage, function() {
		var that = new ASJS.Sprite( "body" );
		
		var _inited = false;
		
		var _mouse	= new ASJS.Mouse();
		var _window	= new ASJS.Window();
		
		var _stageWidth = 0;
		var _stageHeight = 0;
		
		property( that, "title", {
			get: function() { return document.title; },
			set: function( value ) { document.title = value; }
		});
		
		property( that, "stage", { get: function() { return that; } } );
		property( that, "stageWidth", { get: function() { return _stageWidth; } } );
		property( that, "stageHeight", { get: function() { return _stageHeight; } } );
		
		that.init = function() {
			if ( _inited ) return;
			_inited = true;
			
			that.clear();
			that.setSize( "100%", "100%" );
			_window.addEventListener( ASJS.WindowEvent.RESIZE, recalcStageSize );
			recalcStageSize();
			
			_mouse.init();
		};
		
		function recalcStageSize() {
			var overflowX = that.getCSS( "overflow-x" );
			var overflowY = that.getCSS( "overflow-y" );
			
			that.setCSS( "overflow-x", "hidden" );
			that.setCSS( "overflow-y", "hidden" );
			
			_stageWidth = _window.width;
			_stageHeight = _window.height;
			
			that.setCSS( "overflow-x", overflowX );
			that.setCSS( "overflow-y", overflowY );
			
			that.dispatchEvent( ASJS.Stage.RESIZE );
		}
		
		return that;
	});
};
ASJS.Stage.RESIZE				= "ASJS-Stage-resize";
ASJS.Stage.ADDED_TO_STAGE		= "ASJS-Stage-addedToStage";
ASJS.Stage.REMOVED_FROM_STAGE	= "ASJS-Stage-removedFromStage";
