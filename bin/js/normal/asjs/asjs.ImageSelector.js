includeOnce( "js/normal/asjs/asjs.FileSelector.js" );

ASJS.ImageSelector = function() {
	var that = new ASJS.FileSelector();
	
	/* CONSTRUCTOR */{
		that._fileInput.removeEventListener( "change" );
		that._fileInput.addEventListener( "change", function( event ) {
			var target = that._fileInput.domObject[ 0 ];
			if ( target.files && target.files[ 0 ] ) {
				var reader = new FileReader();
				reader.onload = function ( e ) {
					that.setCSS( 'background-image', 'url(' + e.target.result + ')' );
				}
				reader.readAsDataURL( target.files[ 0 ] );
				that.html = "";
			}
		});
	}
	
	return that;
}
