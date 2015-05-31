includeOnce( "js/normal/asjs/display/asjs.Sprite.js" );
includeOnce( "js/normal/asjs/display/list/asjs.Cell.js" );

ASJS.List = function() {
	var that = new ASJS.Sprite();
	var _name;
	var _multiselect = false;
	var _cell = ASJS.Cell;
	var _listItems = [];
	
	defineProperty( that, "cell", {
		get: function() { return _cell; },
		set: function( value ) { _cell = value; }
	});
	
	defineProperty( that, "multiselect", {
		get: function() { return _multiselect; },
		set: function( value ) { _multiselect = value; }
	});
	
	defineProperty( that, "selected", {
		get: function() {
			var value = [];
			var i;
			var item;
			var itemsLength = that.numChildren;
			for ( i = 0; i < itemsLength; i++ ) {
				item = that.getChildAt( i );
				if ( item.checked ) value.push( item.id );
			}
			return value;
		},
		set: function( value ) {
			that.clearSelection();
			
			var i;
			var j;
			var item;
			var itemsLength = that.numChildren;
			var valueLength = that.multiselect ? value.length : 1;
			for ( j = 0; j < valueLength; j++ ) {
				for ( i = 0; i < itemsLength; i++ ) {
					item = that.getChildAt( i );
					if ( item.id == value[ j ] ) {
						item.checked = true;
					}
				}
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
	
	that.clearSelection = function() {
		var i;
		var item;
		var l = that.numChildren;
		for ( i = 0; i < l; i++ ) {
			item = that.getChildAt( i );
			item.checked = false;
		}
	}
	
	that.clearList = function() {
		while ( that.numChildren > 0 ) that.removeChildAt( 0 );
	}
	
	that.setList = function( cellDataVoList ) {
		_listItems = cellDataVoList;
		that.clearList();
		var i;
		var l = _listItems.length;
		for ( i = 0; i < l; i++ ) {
			that.addItem( _listItems[ i ] );
		}
	}
	
	that.getItemAt = function( index ) {
		return that.getChildAt( index ).data;
	}
	
	that.getItemById = function( id ) {
		var data;
		var i;
		var item;
		var itemsLength = that.numChildren;
		for ( i = 0; i < itemsLength; i++ ) {
			item = that.getChildAt( i );
			if ( item.id == id ) data = item.data;
		}
		return data;
	}
	
	that.addItem = function( cellDataVo ) {
		var cell = new _cell();
			cell.name = _name;
			cell.data = cellDataVo;
		return that.addChild( cell );
	}
	
	that.addItemAt = function( cellDataVo, index ) {
		var cell = that.addItem( cellDataVo );
		that.setChildIndex( cell, index );
		return cell;
	}
	
	return that;
}
ASJS.CustomList.CHANGE	= "ASJS-CustomList-change";
