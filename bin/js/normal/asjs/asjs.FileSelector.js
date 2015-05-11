includeOnce( "js/normal/asjs/asjs.FormElement.js" );
includeOnce( "js/normal/asjs/asjs.DisplayObject.js" );

ASJS.FileSelector = function() {
	var that = new ASJS.FormElement();
	var _super = {};
	
	that._fileInput = new ASJS.DisplayObject( "<input />" );
	
	defineProperty( that, "val", {
		get: function() { return that._fileInput.domObject.val(); }
	});
	
	defineProperty( that, "name", {
		get: function() { return that._fileInput.getAttr( "name" ); },
		set: function( value ) { that._fileInput.setAttr( "name", value ); }
	});
	
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
	
	defineProperty( that, "fileInput", {
		get: function() { return _fileInput; }
	});
	
	(function() {
		that._fileInput.setAttr( "type", "file" );
		that._fileInput.addEventListener( "change", function( event ) {
			that.html = that.val;
		});
		that._fileInput.visible = false;
		that.addChild( that._fileInput );
		
		that.addEventListener( "click", function( event ) {
			if ( event.target == that._fileInput.domObject[ 0 ] ) return;
			that._fileInput.domObject.click();
		});
	})();
	
	return that;
}
