includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.Cell = function( tag ) {
	var that = new ASJS.Sprite( tag );
	var _data = {};
	var _checked = false;
	
	property( that, "name", {
		get: function() { return that.getAttr( "name" ); },
		set: function( value ) { that.setAttr( "name", value ); }
	});
	
	property( that, "checked", {
		get: function() { return _checked; },
		set: function( value ) { _checked = value; }
	});
	
	property( that, "data", {
		get: function() { return _data; },
		set: function( value ) {
			_data = value;
			if ( _data.id ) that.id = _data.id;
			that.showData();
		}
	});
	
	that.drawNow = function() {}
	
	that.showData = function() {}
	
	function onClick( event ) {
		var e = new ASJS.MouseEvent( ASJS.Cell.CLICK );
			e.ctrlKey = event.ctrlKey;
			e.shiftKey = event.shiftKey;
		that.dispatchEvent( e );
	}
	
	(function() {
		that.setCSS( "position", "relative" );
		that.mouseChildren = false;
		that.addEventListener( ASJS.MouseEvent.CLICK, onClick );
	})();
	
	return that;
}
ASJS.Cell.CLICK	= "ASJS-Cell-click";
