includeOnce( "org/asjs/display/asjs.PrimitiveDisplayObject.js" );
includeOnce( "org/asjs/utils/asjs.Mouse.js" );
includeOnce( "org/asjs/geom/asjs.GeomUtils.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );
includeOnce( "org/asjs/geom/asjs.Point.js" );

ASJS.DisplayObject = function( tag ) {
	var that = new ASJS.PrimitiveDisplayObject( tag );
	
	var _mouse = new ASJS.Mouse().instance;
	
	var CREATED = "created";
	
	var _state = CREATED;
	
	var _filters = {};
	
	var _rotation = 0;
	var _scaleX = 1;
	var _scaleY = 1;
	var _parent = null;
	var _cssDisplay = "block";
	
	property( that, "bounds", {
		get: function() { return new ASJS.Rectangle( that.calcX, that.calcY, that.calcWidth, that.calcHeight ); }
	});
	
	property( that, "tabIndex", {
		get: function() { return that.getAttr( "tabindex" ); },
		set: function( value ) { that.setAttr( "tabindex", value ); }
	});
	
	property( that, "tooltip", {
		get: function() { return that.setAttr( "title" ); },
		set: function( value ) { that.setAttr( "title", value ); }
	});
	
	property( that, "filters", {
		get: function() { return _filters; },
		set: function( value ) {
			_filters = value;
			var filters = "";
			var i = -1;
			var l = _filters.length;
			while ( ++i < l ) {
				var filter = _filters[ i ];
				filters += " " + filter.execute();
			}
			that.setCSS( "-webkit-filter", filters );
			that.setCSS( "filter", filters );
		}
	});
	
	property( that, "id", {
		get: function() { return that.getAttr( "id" ); },
		set: function( value ) { that.setAttr( "id", value ); }
	});
	
	property( that, "enabled", {
		get: function() { return that.getAttr( "disabled" ) != "disabled"; },
		set: function( value ) {
			if ( value ) {
				that.removeAttr( "disabled" );
				that.setCSS( "pointer-events", "auto" );
			} else {
				that.setAttr( "disabled", "disabled" );
				that.setCSS( "pointer-events", "none" );
			}
		}
	});
	
	property( that, "display", {
		get: function() { return _cssDisplay; },
		set: function( value ) {
			_cssDisplay = value;
			that.setCSS( "display", _cssDisplay );
		}
	});
	
	property( that, "html", {
		get: function() { return that.jQuery.html(); },
		set: function( value ) { that.jQuery.html( value ); }
	});
	
	property( that, "visible", {
		get: function() { return that.getCSS( "display" ) != "none"; },
		set: function( value ) { that.setCSS( "display", value ? _cssDisplay : "none" ); }
	});
	
	property( that, "alpha", {
		get: function() { return parseFloat( that.getCSS( "opacity" ) ) || 1; },
		set: function( value ) { that.setCSS( "opacity", value ); }
	});
	
	property( that, "x", {
		get: function() { return ( parseFloat( that.getCSS( "left" ) ) || 0 ) - ( that.width - that.width / _scaleX ) * 0.5; },
		set: function( value ) { that.setCSS( "left", value + ( that.width - that.width / _scaleX ) * 0.5 ); }
	});
	
	property( that, "y", {
		get: function() { return ( parseFloat( that.getCSS( "top" ) ) || 0 ) - ( that.height - that.height / _scaleY ) * 0.5; },
		set: function( value ) { that.setCSS( "top", value + ( that.height - that.height / _scaleY ) * 0.5 ); }
	});
	
	property( that, "calcX", { get: function() { return that.x + ( parseFloat( that.getCSS( "marginLeft" ) ) || 0 ); } } );
	property( that, "calcY", { get: function() { return that.y + ( parseFloat( that.getCSS( "marginTop" ) ) || 0 ); } } );
	
	property( that, "width", {
		get: function() { return that.jQuery.width() * _scaleX; },
		set: function( value ) {
			that.setCSS( "width", typeof value != "number" ? value : ( parseFloat( value ) / _scaleX ) );
		}
	});
	
	property( that, "height", {
		get: function() { return that.jQuery.height() * _scaleY; },
		set: function( value ) {
			that.setCSS( "height", typeof value != "number" ? value : ( parseFloat( value ) / _scaleY ) );
		}
	});
	
	property( that, "calcWidth", {
		get: function() {
			var paddingLeft = parseFloat( that.getCSS( "paddingLeft" ) ) || 0;
			var paddingRight = parseFloat( that.getCSS( "paddingRight" ) ) || 0;
			var borderLeft = parseFloat( that.getCSS( "borderLeft" ) ) || 0;
			var borderRight = parseFloat( that.getCSS( "borderRight" ) ) || 0;
			return that.width + paddingLeft + paddingRight + borderLeft + borderRight;
		}
	});
	
	property( that, "calcHeight", {
		get: function() {
			var paddingTop = parseFloat( that.getCSS( "paddingTop" ) ) || 0;
			var paddingBottom = parseFloat( that.getCSS( "paddingBottom" ) ) || 0;
			var borderTop = parseFloat( that.getCSS( "borderTop" ) ) || 0;
			var borderBottom = parseFloat( that.getCSS( "borderBottom" ) ) || 0;
			return that.height + paddingTop + paddingBottom + borderTop + borderBottom;
		}
	});
	
	property( that, "rotation", {
		get: function() { return _rotation; },
		set: function( value ) {
			_rotation = parseFloat( value );
			drawTransform();
		}
	});
	
	property( that, "scaleX", {
		get: function() { return _scaleX; },
		set: function( value ) {
			_scaleX = parseFloat( value );
			var oW = that.width / _scaleX;
			that.x += ( that.width - oW ) * 0.5;
			drawTransform();
		}
	});
	
	property( that, "scaleY", {
		get: function() { return _scaleY; },
		set: function( value ) {
			_scaleY = parseFloat( value );
			var oH = that.height / _scaleY;
			that.y += ( that.height - oH ) * 0.5;
			drawTransform();
		}
	});
	
	property( that, "parent", {
		get: function() { return _parent; },
		set: function( value ) {
			if ( value == null || value.getChildIndex( that ) > -1 ) {
				_parent = value;
				that._sendAddedToStageEvent();
			}
		}
	});
	
	property( that, "stage", { get: function() { return that.parent ? that.parent.stage : null; } } );
	
	property( that, "mouse", { get: function() { return _mouse.getRelativePosition( that ); } } );
	
	that.requestFullscreen = function() {
		if ( !ASJS.DisplayObject.FULLSCREEN_ENABLED ) return;
		
		if ( that.el.requestFullscreen ) that.el.requestFullscreen();
		else if ( that.el.webkitRequestFullscreen ) that.el.webkitRequestFullscreen();
		else if ( that.el.mozRequestFullScreen ) that.el.mozRequestFullScreen();
		else if ( that.el.msRequestFullscreen ) that.el.msRequestFullscreen();
	}
	
	that.exitFullscreen = function() {
		if ( !ASJS.DisplayObject.FULLSCREEN_ENABLED ) return;
		
		if ( document.exitFullscreen ) document.exitFullscreen();
		else if ( document.webkitExitFullscreen ) document.webkitExitFullscreen();
		else if ( document.mozCancelFullScreen ) document.mozCancelFullScreen();
		else if ( document.msExitFullscreen ) document.msExitFullscreen();
	}
	
	that.scale = function( scaleX, scaleY ) {
		that.scaleX = scaleX;
		that.scaleY = scaleY;
	}
	
	that.clear = function() {
		that.html = "";
		that.text = "";
	}
	
	that._sendAddedToStageEvent = function() {
		var state = that.stage ? ASJS.Stage.ADDED_TO_STAGE : ASJS.Stage.REMOVED_FROM_STAGE;
		if ( _state != CREATED || state != ASJS.Stage.REMOVED_FROM_STAGE ) {
			that.dispatchEvent( state, null, false );
		}
		_state = state;
	}
	
	that.getCSS = function( key ) { return that.jQuery.css( key ); }
	that.setCSS = function( key, value ) { that.jQuery.css( key, value ); }
	
	that.addClass = function( value ) { return that.jQuery.addClass( value ); }
	that.removeClass = function( value ) { that.jQuery.removeClass( value ); }
	
	that.move = function( x, y ) {
		that.x = x;
		that.y = y;
	}
	
	that.setSize = function( w, h ) {
		that.width = w;
		that.height = h;
	}
	
	that.hitTest = function( point ) {
		return ASJS.GeomUtils.hitTest( that, point );
	}
	
	that.localToGlobal = function( point ) {
		return ASJS.GeomUtils.localToGlobal( that, point );
	};
	
	that.globalToLocal = function( point ) {
		return ASJS.GeomUtils.globalToLocal( that, point );
	};
	
	function drawTransform() {
		that.setCSS( "transform", 'rotate(' + _rotation + 'deg) scaleX(' + _scaleX + ') scaleY(' + _scaleY + ')' );
	}
	
	(function() {
		that.id = "intance_" + ASJS.DisplayObject.INSTANCE_ID;
		that.tabindex = -1;
		that.setCSS( "pointer-events", "auto" );
		that.setCSS( "position", "absolute" );
		that.setCSS( "display", _cssDisplay );
		that.setSize( 0, 0 );
		that.move( 0, 0 );
		
		ASJS.DisplayObject.INSTANCE_ID++;
	})();
	
	return that;
};
ASJS.DisplayObject.INSTANCE_ID			= 0;
ASJS.DisplayObject.FULLSCREEN_ENABLED	= document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
