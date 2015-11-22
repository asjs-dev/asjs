includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.List = function() {
	var that = new ASJS.Sprite();
	var _name;
	
	defineProperty( that, "val", {
		get: function() {
			var value;
			var i;
			var l = that.numChildren;
			var item;
			for ( i = 0; i < l; i++ ) {
				item = that.getChildAt( i );
				if ( item.checked ) value = item.val;
			}
			return value;
		},
		set: function( value ) {
			if ( that.val == value ) return;
			var i;
			var l = that.numChildren;
			var item;
			for ( i = 0; i < l; i++ ) {
				item = that.getChildAt( i );
				item.checked = item.val == value;
			}
		}
	});
	
	defineProperty( that, "name", {
		get: function() { return _name; },
		set: function( value ) {
			_name = value;
			var i;
			var l = that.numChildren;
			var item;
			for ( i = 0; i < l; i++ ) {
				item = that.getChildAt( i );
				item.name = _name;
			}
		}
	});
	
	that.clearList = function() {
		while ( that.numChildren > 0 ) that.removeChildAt( 0 );
	}
	
	that.setListItems = function( items ) {
		that.clearList();
		var i;
		var l = items.length;
		for ( i = 0; i < l; i++ ) that.addItem( items[ i ] );
	}
	
	that.addItem = function( item ) {
		item.name = _name;
		that.addChild( item );
	}
	
	return that;
}
