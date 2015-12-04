includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/list/asjs.Cell.js" );

ASJS.CustomList = function() {
	var that = new ASJS.Sprite();
	
	var _name;
	var _multiselect;
	var _cell;
	var _listItems;
	var _itemsContainer;
	var _lastCellIndex;
	
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
			var l = _itemsContainer.numChildren;
			for ( i = 0; i < l; i++ ) {
				item = _itemsContainer.getChildAt( i );
				if ( item.checked ) value.push( item );
			}
			return value;
		},
		set: function( value ) {
			that.clearSelection();
			
			var i;
			var j;
			var item;
			var l = _itemsContainer.numChildren;
			var valueLength = that.multiselect ? value.length : 1;
			for ( j = 0; j < valueLength; j++ ) {
				for ( i = 0; i < l; i++ ) {
					item = _itemsContainer.getChildAt( i );
					if ( i == value[ j ] ) {
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
			var l = _itemsContainer.numChildren;
			for ( i = 0; i < l; i++ ) {
				item = _itemsContainer.getChildAt( i );
				item.name = _name;
			}
		}
	});
	
	that.clearSelection = function() {
		var i;
		var item;
		var l = _itemsContainer.numChildren;
		for ( i = 0; i < l; i++ ) {
			item = _itemsContainer.getChildAt( i );
			item.checked = false;
		}
	}
	
	that.clearList = function() {
		while ( _itemsContainer.numChildren > 0 ) _itemsContainer.removeChildAt( 0 );
	}
	
	that.setList = function( cellDataVoList ) {
		that.clearList();
		_listItems = cellDataVoList;
		var i;
		var l = _listItems.length;
		for ( i = 0; i < l; i++ ) {
			that.addItem( _listItems[ i ] );
		}
	}
	
	that.getItemAt = function( index ) {
		return _itemsContainer.getChildAt( index ).data;
	}
	
	that.getItemById = function( id ) {
		var data;
		var i;
		var item;
		var l = _itemsContainer.numChildren;
		for ( i = 0; i < l; i++ ) {
			item = _itemsContainer.getChildAt( i );
			if ( item.id == id ) data = item.data;
		}
		return data;
	}
	
	that.addItem = function( cellDataVo ) {
		var cell = new _cell();
			cell.name = _name;
			cell.data = cellDataVo;
		return _itemsContainer.addChild( cell );
	}
	
	that.addItemAt = function( cellDataVo, index ) {
		var cell = that.addItem( cellDataVo );
		_itemsContainer.setChildIndex( cell, index );
		return cell;
	}
	
	that.drawNow = function() {
		var i;
		var l = _itemsContainer.numChildren;
		var cell;
		for ( i = 0; i < l; i++ ) {
			cell = _itemsContainer.getChildAt( i );
			cell.drawNow();
		}
	}
	
	function onCellClick( event ) {
		var cell = _itemsContainer.getChildByDOMObject( event.target );
		if ( !cell ) return;
		
		if ( !that.multiselect || ( !event.ctrlKey && !event.shiftKey ) ) that.clearSelection();
		
		cell.checked = event.ctrlKey ? !cell.checked : true;
		var cellIndex = _itemsContainer.getChildIndex( cell );
		
		if ( !event.ctrlKey && event.shiftKey ) {
			var i;
			var l = Math.abs( cellIndex - _lastCellIndex );
			var step = cellIndex > _lastCellIndex ? -1 : 1;
			for ( i = 0; i < l; i++ ) {
				cell = _itemsContainer.getChildAt( cellIndex + ( i * step ) );
				cell.checked = true;
			}
		}
		_lastCellIndex = cellIndex;
		
		that.dispatchEvent( ASJS.CustomList.CHANGE );
	}
	
	function initView() {
		_multiselect = false;
		_cell = ASJS.Cell;
		_listItems = [];
		_lastCellIndex = 0;
		
		_itemsContainer = new ASJS.Sprite();
		_itemsContainer.setCSS( "position", "relative" );
		_itemsContainer.setSize( "auto", "auto" );
		_itemsContainer.addEventListener( ASJS.Cell.CLICK, onCellClick );
		that.addChild( _itemsContainer );
	}
	
	(function() {
		initView();
	})();
	
	return that;
}
ASJS.CustomList.CHANGE	= "ASJS-CustomList-change";
