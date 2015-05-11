includeOnce( "js/normal/asjs/asjs.Sprite.js" );

ASJS.List = function() {
	var that = new ASJS.Sprite();
	var _name;
	
	defineProperty( that, "val", {
		get: function() {
			var value;
			var i;
			var item;
			for ( i = 0; i < that.numChildren; i++ ) {
				item = that.getChildAt( i );
				if ( item.checked ) value = item.val;
			}
			return value;
		},
		set: function( value ) {
			var i;
			var item;
			for ( i = 0; i < that.numChildren; i++ ) {
				item = that.getChildAt( i );
				if ( item.val == value ) item.checked = true;
				else item.checked = false;
			}
		}
	});
	
	defineProperty( that, "name", {
		get: function() { return _name; },
		set: function( value ) {
			_name = value;
			var i;
			var item;
			for ( i = 0; i < that.numChildren; i++ ) {
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
		for ( i = 0; i < items.length; i++ ) that.addItem( items[ i ] );
	}
	
	that.addItem = function( item ) {
		item.name = _name;
		that.addChild( item );
	}
	
	that.removedFromStage = function() {
		that.removeEventListeners();
	}
	
	that.addedToStage = function() {
		that.addEventListener( "change", function( event ) {
			var i;
			var item;
			for ( i = 0; i < that.numChildren; i++ ) {
				item = that.getChildAt( i );
				item.drawNow();
			}
		});
	}
	
	return that;
}
