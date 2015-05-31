includeOnce( "js/normal/asjs/display/asjs.Sprite.js" );

ASJS.Cell = function( domElement ) {
	var that = new ASJS.Sprite( domElement );
	var _data = {};
	var _checked = false;
	
	defineProperty( that, "name", {
		get: function() { return that.getAttr( "name" ); },
		set: function( value ) { that.setAttr( "name", value ); }
	});
	
	defineProperty( that, "checked", {
		get: function() { return _checked; },
		set: function( value ) { _checked = value; }
	});
	
	defineProperty( that, "data", {
		get: function() { return _data; },
		set: function( value ) {
			_data = value;
			
			if ( _data.id ) that.id = _data.id;
			
			that.showData();
		}
	});
	
	that.showData = function() {
		console.log( that.data );
	}
	
	return that;
}
