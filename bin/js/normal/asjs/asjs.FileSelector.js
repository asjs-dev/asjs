includeOnce( "js/normal/asjs/asjs.FormElement.js" );
includeOnce( "js/normal/asjs/asjs.DisplayObject.js" );

ASJS.FileSelector = function() {
	var that = new ASJS.FormElement();
	var _super = {};
	that._fileInput = new ASJS.DisplayObject( "<input />" );
	
	extendProperty( _super, that, "enabled" );
	defineProperty( that, "enabled", {
		set: function( value ) {
			_super.enabled = value;
			if ( value ) {
				that._fileInput.domObject.removeAttr( "disabled" );
				that._fileInput.setCSS( "pointer-events", "auto" );
			} else {
				that._fileInput.setAttr( "disabled", "disabled" );
				that._fileInput.setCSS( "pointer-events", "none" );
			}
			that.drawNow();
		}
	})
	
	/* CONSTRUCTOR */ {
		that._fileInput.setAttr( "type", "file" );
		that._fileInput.addEventListener( "change", function( event ) {
			that.html = that._fileInput.domObject.val();
		});
		
		that.addEventListener( "click", function( event ) {
			that._fileInput.domObject.click();
		});
	}
	
	return that;
}
