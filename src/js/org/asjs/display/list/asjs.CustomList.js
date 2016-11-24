includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/list/asjs.Cell.js" );

ASJS.CustomList = function() {
	var that = new ASJS.Sprite();
	
	var _name;
	var _multiselect;
	var _cell;
	var _itemsContainer;
	var _lastCellIndex;
	
	property( that, "length", { get: function() { return _itemsContainer.numChildren; } } );
	
	property( that, "cell", {
		get: function() { return _cell; },
		set: function( value ) { _cell = value; }
	});
	
	property( that, "multiselect", {
		get: function() { return _multiselect; },
		set: function( value ) { _multiselect = value; }
	});
	
	property( that, "selected", {
		get: function() {
			var value = [];
			var i = -1;
			var l = that.length;
			while ( ++i < l ) {
				var item = that.getCellAt( i );
				if ( item.checked ) value.push( item );
			}
			return value;
		},
		set: function( value ) {
			that.clearSelection();
			
			var j = -1;
			var l = that.length;
			var valueLength = that.multiselect ? value.length : 1;
			while ( ++j < valueLength ) {
				var i = -1;
				while ( ++i < l ) {
					var item = that.getCellAt( i );
					if ( i == value[ j ] ) item.checked = true;
				}
			}
		}
	});
	
	property( that, "name", {
		get: function() { return _name; },
		set: function( value ) {
			_name = value;
			var i = -1;
			var l = that.length;
			while ( ++i < l ) {
				var item = that.getCellAt( i );
				item.name = _name;
			}
		}
	});
	
	that.clearSelection = function() {
		var i = -1;
		var l = that.length;
		while ( ++i < l ) {
			var item = that.getCellAt( i );
			item.checked = false;
		}
	}
	
	that.clearList = function() {
		while ( that.length > 0 ) _itemsContainer.removeChildAt( 0 );
	}
	
	that.setList = function( cellDataVoList ) {
		that.clearList();
		var i = -1;
		var l = cellDataVoList.length;
		while ( ++i < l ) that.addItem( cellDataVoList[ i ] );
	}
	
	that.getList = function() {
		var list = [];
		var i = -1;
		var l = that.length;
		while ( ++i < l ) {
			var cellData = that.getItemAt( i );
			list.push( cellData );
		}
		return list;
	}
	
	that.getCellAt = function( index ) {
		if ( index < 0 || index >= that.length ) return null;
		return _itemsContainer.getChildAt( index );
	}
	
	that.getItemAt = function( index ) {
		var cell = that.getCellAt( index );
		return cell ? cell.data : null;
	}
	
	that.getCellById = function( id ) {
		var i = -1;
		var l = that.length;
		while ( ++i < l ) {
			var cell = that.getCellAt( i );
			if ( cell.id == id ) return cell;
		}
		return null;
	}
	
	that.getItemById = function( id ) {
		var cell = that.getCellById( id );
		return cell ? cell.data : null;
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
	
	that.removeCell = function( cell ) {
		if ( !cell || !_itemsContainer.contains( cell ) ) return;
		_itemsContainer.removeChild( cell );
	}
	
	that.removeCellById = function( id ) {
		that.removeCell( that.getCellById( id ) );
	}
	
	that.drawNow = function() {
		var i = -1;
		var l = that.length;
		while ( ++i < l ) {
			var cell = that.getCellAt( i );
				cell.setSize( that.width, that.height );
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
			var i = -1;
			var l = Math.abs( cellIndex - _lastCellIndex );
			var step = cellIndex > _lastCellIndex ? -1 : 1;
			while ( ++i < l ) {
				cell = that.getCellAt( cellIndex + ( i * step ) );
				cell.checked = true;
			}
		}
		_lastCellIndex = cellIndex;
		
		that.dispatchEvent( ASJS.CustomList.CHANGE );
	}
	
	(function() {
		_multiselect = false;
		_cell = ASJS.Cell;
		_lastCellIndex = 0;
		
		_itemsContainer = new ASJS.Sprite();
		_itemsContainer.setCSS( "position", "relative" );
		_itemsContainer.setSize( "auto", "auto" );
		_itemsContainer.addEventListener( ASJS.Cell.CLICK, onCellClick );
		that.addChild( _itemsContainer );
	})();
	
	return that;
}
ASJS.CustomList.CHANGE	= "ASJS-CustomList-change";
