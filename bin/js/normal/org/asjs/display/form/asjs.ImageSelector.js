includeOnce( "org/asjs/display/form/asjs.FileSelector.js" );

ASJS.ImageSelector = function() {
	var that = new ASJS.FileSelector();
	
	var _preview = new ASJS.Sprite();
	var _reader = new FileReader();
	
	defineProperty( that, "preview", { get: function() { return _preview; } } );
	
	that._onChange = function( event ) {
		var target = that._fileInput.domElement;
		if ( target.files && target.files[ 0 ] ) _reader.readAsDataURL( target.files[ 0 ] );
	}
	
	function readerOnLoad( event ) {
		_preview.setCSS( 'background-image', 'url(' + event.target.result + ')' );
	}
	
	function init() {
		that._fileInput.removeEventListeners();
		that._fileInput.addEventListener( ASJS.Event.CHANGE, that._onChange );
		
		_preview.setSize( "100%", "100%" );
		_preview.move( 0, 0 );
		that.addChild( _preview );
		
		_reader.onload = readerOnLoad;
	}
	
	(function() {
		init();
	})();
	
	return that;
}
