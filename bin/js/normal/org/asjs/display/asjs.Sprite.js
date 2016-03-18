includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.Sprite = function( domElement ) {
	var that = new ASJS.DisplayObject( domElement );
	var _super = {};
	var _children = [];
	var _mouseChildren = true;
	
	extendProperty( _super, that, "bounds" );
	defineProperty( that, "bounds", {
		get: function() {
			var rect = _super.bounds;
			var size = new ASJS.Rectangle();
			
			var childRect;
			var i = -1;
			var l = that.numChildren;
			var child;
			while ( ++i < l ) {
				child = that.getChildAt( i );
				childRect = child.bounds;
				if ( i == 0 ) {
					size.x = childRect.x;
					size.y = childRect.y;
					size.width = childRect.width + childRect.x;
					size.height = childRect.height + childRect.y;
				} else {
					if ( childRect.x < size.x ) size.x = childRect.x;
					if ( childRect.y < size.y ) size.y = childRect.y;
					if ( childRect.width + childRect.x > size.width ) size.width = childRect.width + childRect.x;
					if ( childRect.height + childRect.y > size.height ) size.height = childRect.height + childRect.y;
				}
			}
			
			rect.x += size.x;
			rect.y += size.y;
			if ( size.width - size.x > rect.width ) rect.width = size.width - size.x;
			if ( size.height - size.y > rect.height ) rect.height = size.height - size.y;
			
			return rect;
		}
	});
	
	extendFunction( _super, that, "_sendAddedToStageEvent" );
	that._sendAddedToStageEvent = function() {
		_super._sendAddedToStageEvent();
		var i = -1;
		var l = that.numChildren;
		var child;
		while ( ++i < l ) {
			child = that.getChildAt( i );
			child._sendAddedToStageEvent();
		}
	}
	
	defineProperty( that, "mouseChildren", {
		get: function() { return _mouseChildren; },
		set: function( value ) {
			_mouseChildren = value;
			var i = -1;
			var l = that.numChildren;
			while ( ++i < l ) that.getChildAt( i ).enabled = _mouseChildren;
		}
	});
	
	defineProperty( that, "numChildren", { get: function() { return _children.length; } } );
	
	extendFunction( _super, that, "clear" );
	that.clear = function() {
		while ( that.numChildren > 0 ) that.removeChildAt( 0 );
		_super.clear();
	}
	
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
		child.enabled = child.enabled ? _mouseChildren : child.enabled;
		_children.push( child );
		that.setChildIndex( child, index );
		child.parent = that;
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
		var i = -1;
		var l = that.numChildren;
		var child;
		while ( ++i < l ) {
			child = that.getChildAt( i );
			if ( domObject.id == child.id ) return child;
		}
		return null;
	}
	
	return that;
}

