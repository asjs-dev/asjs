includeOnce( "js/normal/asjs/asjs.Sprite.js" );

function PreloaderView() {
	var that = new ASJS.Sprite();
	
	/* CONSTRUCTOR */{
		that.setSize( "100%", "100%" );
		that.setCSS( "position", "fixed" );
		that.setCSS( "background-color", "rgba( 0, 0, 0, 0.5 )" );
	}
	
	return that;
}
