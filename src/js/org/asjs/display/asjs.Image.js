includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/display/bitmap/asjs.Bitmap.js" );

ASJS.Image = function() {
	var that = new ASJS.DisplayObject( "<img />" );
	
	property( that, "src", {
		get: function() { return that.getAttr( "src" ); },
		set: function( value ) { that.setAttr( "src", value ); }
	});
	
	property( that, "bitmap", {
		get: function() {
			var bmp = new ASJS.Bitmap( that.imageWidth, that.imageHeight );
				bmp.drawImage( that, 0, 0, that.imageWidth, that.imageHeight, 0, 0, that.imageWidth, that.imageHeight );
			return bmp;
		}
	});
	
	property( that, "alt", {
		get: function() { return that.getAttr( "alt" ); },
		set: function( value ) { that.setAttr( "alt", value ); }
	});
	
	property( that, "imageWidth", {
		get: function() { return that.el.width; }
	});
	
	property( that, "imageHeight", {
		get: function() { return that.el.height; }
	});
	
	return that;
}
