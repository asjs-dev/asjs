includeOnce( "js/normal/asjs/asjs.DisplayObject.js" );

ASJS.Bitmap = function( bitmapWidth, bitmapHeight ) {
	try {
		if ( rasterizeHTML ) {}
	} catch( e ) {
		throw new Error( "Missing: http://www.github.com/cburgmer/rasterizeHTML.js" );
	}
	
	if ( !bitmapWidth || !bitmapHeight || bitmapWidth < 1 || bitmapHeight < 1 ) {
		throw new Error( "Parameters is null or lower than 1" );
	}
	
	var that = new ASJS.DisplayObject( "<canvas />" );
	
	defineProperty( that, "width", {
		set: function( value ) {
			that.setCSS( "width", value );
			that.setAttr( "width", value );
		}
	});
	
	defineProperty( that, "height", {
		set: function( value ) {
			that.setCSS( "height", value );
			that.setAttr( "height", value );
		}
	});
	
	that.draw = function( value ) {
		rasterizeHTML.drawHTML( value, $( that.domObject )[ 0 ] );
	}
	
	(function() {
		that.width = bitmapWidth;
		that.height = bitmapHeight;
	})();
	
	return that;
}
