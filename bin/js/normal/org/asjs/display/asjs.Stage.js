includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.Stage = function() {
	function StageInstance() {
		var that = new ASJS.Sprite();
		
		var _window = $( window );
		var _head = $( "head" );
	
		that.domObject = $( "body" );
		
		var _stageWidth = 0;
		var _stageHeight = 0;
		
		defineProperty( that, "title", {
			get: function() { return document.title; },
			set: function( value ) { document.title = value; }
		});
		
		defineProperty( that, "stage", { get: function() { return that; } } );
		defineProperty( that, "stageWidth", { get: function() { return _stageWidth; } } );
		defineProperty( that, "stageHeight", { get: function() { return _stageHeight; } } );
		defineProperty( that, "window", { get: function() { return _window; } } );
		defineProperty( that, "head", { get: function() { return _head; } } );
		
		function recalcStageSize() {
			var overflowX = that.getCSS( "overflow-x" );
			var overflowY = that.getCSS( "overflow-y" );
			
			that.setCSS( "overflow-x", "hidden" );
			that.setCSS( "overflow-y", "hidden" );
			
			_stageWidth = _window.width();
			_stageHeight = _window.height();
			
			that.setCSS( "overflow-x", overflowX );
			that.setCSS( "overflow-y", overflowY );
			
			that.dispatchEvent( ASJS.Stage.RESIZE );
		}
		
		(function() {
			that.clear();
			that.setSize( "100%", "100%" );
			_window.resize( recalcStageSize );
			recalcStageSize();
		})();
		
		return that;
	};
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !ASJS.Stage.$ ) ASJS.Stage.$ = new StageInstance();
			return ASJS.Stage.$;
		}
	});
};
ASJS.Stage.RESIZE				= "ASJS-Stage-resize";
ASJS.Stage.ADDED_TO_STAGE		= "ASJS-Stage-addedToStage";
ASJS.Stage.REMOVED_FROM_STAGE	= "ASJS-Stage-removedFromStage";
