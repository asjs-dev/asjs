includeOnce( "js/normal/asjs/asjs.FileSelector.js" );

ASJS.ImageSelector = function() {
	var that = new ASJS.FileSelector();
	
	var _preview = new ASJS.Sprite();
	
	defineProperty( that, "preview", {
		get: function() { return _preview; }
	});
	
	(function() {
		_preview.setSize( "100%", "100%" );
		_preview.move( 0, 0 );
		that.addChild( _preview );
		
		that._fileInput.removeEventListeners( "change" );
		that._fileInput.addEventListener( "change", function( event ) {
			var target = that._fileInput.domObject[ 0 ];
			if ( target.files && target.files[ 0 ] ) {
				var reader = new FileReader();
				reader.onload = function ( e ) {
					_preview.setCSS( 'background-image', 'url(' + e.target.result + ')' );
				}
				reader.readAsDataURL( target.files[ 0 ] );
			}
		});
	})();
	
	return that;
}
