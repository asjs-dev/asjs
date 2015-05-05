includeOnce( "js/normal/asjs/asjs.Sprite.js" );

ASJS.Stage = function() {
	function StageInstance() {
		var that = new ASJS.Sprite();
		var _window = $( window );
		var _head = $( "head" );
	
		that.domObject = $( "body" );
	
		defineProperty( that, "stageWidth", {
			get: function() {
				var overflowX = that.getCSS( "overflow-x" );
				var overflowY = that.getCSS( "overflow-y" );
				that.setCSS( "overflow-x", "hidden" );
				that.setCSS( "overflow-y", "hidden" );
				var windowWidth = _window.width();
				that.setCSS( "overflow-x", overflowX );
				that.setCSS( "overflow-y", overflowY );
				return windowWidth;
			}
		});
	
		defineProperty( that, "stageHeight", {
			get: function() {
				var overflowX = that.getCSS( "overflow-x" );
				var overflowY = that.getCSS( "overflow-y" );
				that.setCSS( "overflow-x", "hidden" );
				that.setCSS( "overflow-y", "hidden" );
				var windowHeight = _window.height();
				that.setCSS( "overflow-x", overflowX );
				that.setCSS( "overflow-y", overflowY );
				return windowHeight;
			}
		});
	
		defineProperty( that, "window", {
			get: function() { return _window; }
		});
	
		defineProperty( that, "head", {
			get: function() { return _head; }
		});
	
		/* CONSTRUCTOR */{
			that.setSize( "100%", "100%" );
		}
		
		return that;
	};
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !ASJS.Stage.$ ) ASJS.Stage.$ = new StageInstance();
			return ASJS.Stage.$;
		}
	});
};
