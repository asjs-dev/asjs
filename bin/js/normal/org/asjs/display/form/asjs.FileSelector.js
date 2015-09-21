includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

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
			that._fileInput.enabled = that.enabled;
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
		
		that.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			if ( event.target == that._fileInput.domElement ) return;
			that._fileInput.domObject.click();
		});
	})();
	
	return that;
}
