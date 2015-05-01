includeOnce( "js/normal/asjs/asjs.Mouse.js" );

ASJS.DisplayObject = function( domElement ) {
	var that = {};
	var _rotation = 0;
	var _parent = null;
	var _cssDisplay = "block";
	
	defineProperty( that, "id", {
		get: function() { return that.getAttr( "id" ); },
		set: function( value ) { that.setAttr( "id", value ); }
	});
	
	defineProperty( that, "enabled", {
		get: function() { return that.getAttr( "disabled" ) != "disabled"; },
		set: function( value ) {
			if ( value ) {
				that.domObject.removeAttr( "disabled" );
				that.setCSS( "pointer-events", "auto" );
			} else {
				that.setAttr( "disabled", "disabled" );
				that.setCSS( "pointer-events", "none" );
			}
		}
	});
	
	defineProperty( that, "display", {
		get: function() { return _cssDisplay; },
		set: function( value ) {
			_cssDisplay = value;
			that.setCSS( "display", _cssDisplay );
		}
	});
	
	defineProperty( that, "html", {
		get: function() { return that.domObject.html(); },
		set: function( value ) { that.domObject.html( value ); }
	});
	
	defineProperty( that, "text", {
		get: function() { return that.domObject.text(); },
		set: function( value ) { that.domObject.text( value ); }
	});
	
	defineProperty( that, "visible", {
		get: function() { return that.getCSS( "display" ) != "none"; },
		set: function( value ) { that.setCSS( "display", value ? _cssDisplay : "none" ); }
	});
	
	defineProperty( that, "alpha", {
		get: function() { return parseFloat( that.getCSS( "opacity" ) ); },
		set: function( value ) { that.setCSS( "opacity", value ); }
	});
	
	defineProperty( that, "x", {
		get: function() { return parseFloat( that.getCSS( "left" ) ); },
		set: function( value ) { that.setCSS( "left", value ); }
	});
	
	defineProperty( that, "y", {
		get: function() { return parseFloat( that.getCSS( "top" ) ); },
		set: function( value ) { that.setCSS( "top", value ); }
	});
	
	defineProperty( that, "calcX", {
		get: function() { return that.x + parseFloat( that.getCSS( "marginLeft" ) ); }
	});
	
	defineProperty( that, "calcY", {
		get: function() { return that.y + parseFloat( that.getCSS( "marginTop" ) ); }
	});
	
	defineProperty( that, "right", {
		get: function() { return parseFloat( that.getCSS( "right" ) ); },
		set: function( value ) { that.setCSS( "right", value ); }
	});
	
	defineProperty( that, "bottom", {
		get: function() { return parseFloat( that.getCSS( "bottom" ) ); },
		set: function( value ) { that.setCSS( "bottom", value ); }
	});
	
	defineProperty( that, "width", {
		get: function() { return that.domObject.width(); },
		set: function( value ) {
			that.setCSS( "width", value );
		}
	});
	
	defineProperty( that, "height", {
		get: function() { return that.domObject.height(); },
		set: function( value ) {
			that.setCSS( "height", value );
		}
	});
	
	defineProperty( that, "calcWidth", {
		get: function() {
			return that.width + parseFloat( that.getCSS( "paddingLeft" ) ) + parseFloat( that.getCSS( "paddingRight" ) );
		}
	});
	
	defineProperty( that, "calcHeight", {
		get: function() {
			return that.height + parseFloat( that.getCSS( "paddingTop" ) ) + parseFloat( that.getCSS( "paddingBottom" ) );
		}
	});
	
	defineProperty( that, "rotation", {
		get: function() { return _rotation; },
		set: function( value ) {
			_rotation = parseFloat( value );
			that.setCSS( "transform", 'rotate(' + _rotation + 'deg)' );
		}
	});
	
	defineProperty( that, "parent", {
		get: function() { return _parent; },
		set: function( value ) {
			var prevParent = _parent;
			_parent = value;
			if ( _parent && !prevParent ) that.addedToStage();
			else if ( !_parent && prevParent ) that.removedFromStage();
		}
	});
	
	defineProperty( that, "mouseX", {
		get: function() { return new ASJS.Mouse().instance.getRelativePosition( that ).x; }
	});
	
	defineProperty( that, "mouseY", {
		get: function() { return new ASJS.Mouse().instance.getRelativePosition( that ).y; }
	});
	
	that.getCSS = function( key ) { return that.domObject.css( key ); }
	that.setCSS = function( key, value ) { that.domObject.css( key, value ); }
	
	that.addClass = function( value ) { return that.domObject.addClass( value ); }
	that.removeClass = function( value ) { that.domObject.removeClass( value ); }
	
	that.getAttr = function( key ) { return that.domObject.attr( key ); }
	that.setAttr = function( key, value ) { that.domObject.attr( key, value ); }
	
	that.hitTest = function( point ) {
		var rotationDeg = - that.rotation * ASJS.DisplayObject.THETA;
		
		var globalPos = that.localToGlobal( new ASJS.Point( 0, 0 ) );
		var diffPoint = new ASJS.Point( point.x - ( globalPos.x + that.calcWidth * 0.5 ), point.y - ( globalPos.y + that.calcHeight * 0.5 ) );
		var rotatedDiffPoint = new ASJS.Point( 
			diffPoint.x * Math.cos( rotationDeg ) - diffPoint.y * Math.sin( rotationDeg ), 
			diffPoint.x * Math.sin( rotationDeg ) + diffPoint.y * Math.cos( rotationDeg ) 
		);
		var recalcPoint = new ASJS.Point( point.x - ( diffPoint.x - rotatedDiffPoint.x ), point.y - ( diffPoint.y - rotatedDiffPoint.y ) );
		
		var localPoint = that.globalToLocal( recalcPoint );
		return localPoint.x >= 0 && localPoint.y >= 0 && localPoint.x <= that.calcWidth && localPoint.y <= that.calcHeight;
	}
	
	that.move = function( x, y ) {
		that.x = x;
		that.y = y;
	}
	
	that.setSize = function( w, h ) {
		that.width = w;
		that.height = h;
	}
	
	that.localToGlobal = function( point ) {
		if ( !point ) throw new Error( "DisplayObject.localToGlobal: Point is null" );
		var pos = new ASJS.Point( point.x, point.y );
		var i;
		var child = that;
		while ( child ) {
			pos.x += child.x || 0;
			pos.y += child.y || 0;
			child = child.parent;
		}
		return pos;
	};
	
	that.globalToLocal = function( point ) {
		if ( !point ) throw new Error( "DisplayObject.globalToLocal: Point is null" );
		var pos = new ASJS.Point( point.x, point.y );
		var i;
		var child = that;
		while ( child ) {
			pos.x -= child.x || 0;
			pos.y -= child.y || 0;
			child = child.parent;
		}
		return pos;
	};
	
	that.addedToStage = function() {}
	
	that.removedFromStage = function() {}
	
	that.dispatchEvent = function( type, data ) {
		that.domObject.trigger( type, data );
	}
	
	that.addEventListener = function( type, callback ) {
		that.domObject.on( type, callback );
	}
	
	that.removeEventListeners = function() {
		that.domObject.off();
	}
	
	that.removeEventListener = function( type ) {
		that.domObject.off( type );
	}
	
	that.domObject = $( domElement || "<div />", { tabindex: "-1", style: ( "pointer-events: auto; position: absolute; display: " + _cssDisplay + "; width: 0px; height: 0px; top: 0px; left: 0px;" ) } );
	
	/* CONSTRUCTOR */{}
	
	return that;
};
ASJS.DisplayObject.THETA = Math.PI / 180;
