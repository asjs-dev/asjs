includeOnce( "js/normal/asjs/asjs.FileUploader.js" );

ASJS.ImageUploader = function() {
	var that = new ASJS.FileUpload();
	
	/* CONSTRUCTOR */{
		that._fileInput.domObject.off( "change" ).on( "change", function( event ) {
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
