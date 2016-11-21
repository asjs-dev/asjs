includeOnce( "org/asjs/display/form/asjs.FileSelector.js" );

ASJS.ImageSelector = function() {
	var that = new ASJS.FileSelector();
	
	var _reader = new FileReader();
	
	that._onChange = function( event ) {
		var target = that._fileInput.el;
		if ( target.files && target.files[ 0 ] ) {
			that.dispatchEvent( ASJS.ImageSelector.ON_CHANGE_START );
			_reader.readAsDataURL( target.files[ 0 ] );
		}
	}
	
	function readerOnLoad( event ) {
		that.preview.setCSS( 'background-image', 'url(' + event.target.result + ')' );
		that.dispatchEvent( ASJS.ImageSelector.ON_CHANGE_END );
	}
	
	function init() {
		that._fileInput.removeEventListeners();
		that._fileInput.addEventListener( ASJS.Event.CHANGE, that._onChange );
		
		_reader.onload = readerOnLoad;
	}
	
	(function() {
		init();
	})();
	
	return that;
}
ASJS.ImageSelector.ON_CHANGE_START	= "ASJS-ImageSelector-onChangeStart";
ASJS.ImageSelector.ON_CHANGE_END	= "ASJS-ImageSelector-onChangeEnd";
