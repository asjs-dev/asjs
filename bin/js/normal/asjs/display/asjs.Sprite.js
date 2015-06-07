includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );

ASJS.Sprite = function( domElement ) {
	var that = new ASJS.DisplayObject( domElement );
	var _children = [];
	var _mouseChildren = true;
	
	defineProperty( that, "mouseChildren", {
		get: function() { return _mouseChildren; },
		set: function( value ) {
			_mouseChildren = value;
			var i;
			var l = that.numChildren;
			for ( i = 0; i < l; i++ ){
				that.getChildAt( i ).enabled = _mouseChildren;
			}
		}
	});
	
	defineProperty( that, "numChildren", {
		get: function() { return _children.length; }
	});
	
	that.contains = function( child ) {
		return that.getChildIndex( child ) > -1;
	}
	
	that.addChild = function( child ) {
		return that.addChildAt( child, that.numChildren );
	}
	
	that.addChildAt = function( child, index ) {
		if ( !child ) return null;
		if ( child.parent ) child.parent.removeChild( child );
		that.domObject.append( child.domObject );
		child.parent = that;
		child.enabled = _mouseChildren;
		_children.push( child );
		that.setChildIndex( child, index );
		return child;
	}
	
	that.removeChild = function( child ) {
		if ( !child ) return null;
		child.domObject.detach();
		var index = that.getChildIndex( child );
		if ( index > -1 ) _children.splice( index, 1 );
		child.parent = null;
		return child;
	}
	
	that.removeChildAt = function( index ) {
		return that.removeChild( that.getChildAt( index ) );
	}
	
	that.getChildAt = function( index ) {
		if ( index < 0 || index > that.numChildren - 1 ) return null;
		return _children[ index ];
	}
	
	that.setChildIndex = function( child, index ) {
		if ( !child || index < 0 ) return null;
		var childActualIndex = that.getChildIndex( child );
		if ( childActualIndex > -1 ) _children.splice( childActualIndex, 1 );
		var afterChild = that.getChildAt( index );
		if ( afterChild ) child.domObject.insertBefore( afterChild.domObject );
		_children.splice( index, 0, child );
		return child;
	}
	
	that.getChildIndex = function( child ) {
		if ( !child ) return -1;
		return _children.indexOf( child );
	}
	
	that.swapChildren = function( childA, childB ) {
		var childAIndex = that.getChildIndex( childA );
		var childBIndex = that.getChildIndex( childB );
		if ( childAIndex == -1 || childBIndex == -1 ) return false;
		that.setChildIndex( childA, childBIndex );
		that.setChildIndex( childB, childAIndex );
		return true;
	}
	
	that.getChildByDOMObject = function( domObject ) {
		if ( !domObject ) return null;
		var i;
		var child;
		for ( i = 0; i < that.numChildren; i++ ) {
			child = that.getChildAt( i );
			if ( domObject.id == child.id ) return child;
		}
		return null;
	}
	
	return that;
}

