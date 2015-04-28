includeOnce( "js/normal/asjs/asjs.Sprite.js" );

ASJS.Stage = function() {
	function StageInstance() {
		var that = new ASJS.Sprite();
		var _window = $( window );
		var _head = $( "head" );
	
		that.domObject = $( "body" );
	
		defineProperty( that, "stageWidth", {
			get: function() { return _window.outerWidth( true ); }
		});
	
		defineProperty( that, "stageHeight", {
			get: function() { return _window.outerHeight( true ); }
		});
	
		defineProperty( that, "window", {
			get: function() { return _window; }
		});
	
		defineProperty( that, "head", {
			get: function() { return _head; }
		});
	
		/* CONSTRUCTOR */{
			that.width = "100%";
			that.height = "100%";
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
