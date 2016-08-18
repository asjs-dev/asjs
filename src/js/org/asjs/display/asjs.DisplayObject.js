includeOnce( "org/asjs/display/asjs.PrimitiveDisplayObject.js" );
includeOnce( "org/asjs/utils/asjs.Mouse.js" );
includeOnce( "org/asjs/geom/asjs.GeomUtils.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );
includeOnce( "org/asjs/geom/asjs.Point.js" );

ASJS.DisplayObject = function( domElement ) {
	var that = new ASJS.PrimitiveDisplayObject( domElement );
	
	var _mouse = new ASJS.Mouse().instance;
	
	var CREATED = "created";
	
	var _state = CREATED;
	
	var _filters = {};
	
	var _rotation = 0;
	var _scaleX = 1;
	var _scaleY = 1;
	var _parent = null;
	var _cssDisplay = "block";
	
	defineProperty( that, "bounds", {
		get: function() { return new ASJS.Rectangle( that.calcX, that.calcY, that.calcWidth, that.calcHeight ); }
	});
	
	defineProperty( that, "tooltip", {
		get: function() { return that.setAttr( "title" ); },
		set: function( value ) { that.setAttr( "title", value ); }
	});
	
	defineProperty( that, "filters", {
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
	
	defineProperty( that, "id", {
		get: function() { return that.getAttr( "id" ); },
		set: function( value ) { that.setAttr( "id", value ); }
	});
	
	defineProperty( that, "enabled", {
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
	
	defineProperty( that, "visible", {
		get: function() { return that.getCSS( "display" ) != "none"; },
		set: function( value ) { that.setCSS( "display", value ? _cssDisplay : "none" ); }
	});
	
	defineProperty( that, "alpha", {
		get: function() { return parseFloat( that.getCSS( "opacity" ) ) || 1; },
		set: function( value ) { that.setCSS( "opacity", value ); }
	});
	
	defineProperty( that, "x", {
		get: function() { return ( parseFloat( that.getCSS( "left" ) ) || 0 ) - ( that.width - that.width / _scaleX ) * 0.5; },
		set: function( value ) { that.setCSS( "left", value + ( that.width - that.width / _scaleX ) * 0.5 ); }
	});
	
	defineProperty( that, "y", {
		get: function() { return ( parseFloat( that.getCSS( "top" ) ) || 0 ) - ( that.height - that.height / _scaleY ) * 0.5; },
		set: function( value ) { that.setCSS( "top", value + ( that.height - that.height / _scaleY ) * 0.5 ); }
	});
	
	defineProperty( that, "calcX", { get: function() { return that.x + ( parseFloat( that.getCSS( "marginLeft" ) ) || 0 ); } } );
	defineProperty( that, "calcY", { get: function() { return that.y + ( parseFloat( that.getCSS( "marginTop" ) ) || 0 ); } } );
	
	defineProperty( that, "width", {
		get: function() { return that.domObject.width() * _scaleX; },
		set: function( value ) {
			that.setCSS( "width", typeof value != "number" ? value : ( parseFloat( value ) / _scaleX ) );
		}
	});
	
	defineProperty( that, "height", {
		get: function() { return that.domObject.height() * _scaleY; },
		set: function( value ) {
			that.setCSS( "height", typeof value != "number" ? value : ( parseFloat( value ) / _scaleY ) );
		}
	});
	
	defineProperty( that, "calcWidth", {
		get: function() {
			var paddingLeft = parseFloat( that.getCSS( "paddingLeft" ) ) || 0;
			var paddingRight = parseFloat( that.getCSS( "paddingRight" ) ) || 0;
			var borderLeft = parseFloat( that.getCSS( "borderLeft" ) ) || 0;
			var borderRight = parseFloat( that.getCSS( "borderRight" ) ) || 0;
			return that.width + paddingLeft + paddingRight + borderLeft + borderRight;
		}
	});
	
	defineProperty( that, "calcHeight", {
		get: function() {
			var paddingTop = parseFloat( that.getCSS( "paddingTop" ) ) || 0;
			var paddingBottom = parseFloat( that.getCSS( "paddingBottom" ) ) || 0;
			var borderTop = parseFloat( that.getCSS( "borderTop" ) ) || 0;
			var borderBottom = parseFloat( that.getCSS( "borderBottom" ) ) || 0;
			return that.height + paddingTop + paddingBottom + borderTop + borderBottom;
		}
	});
	
	defineProperty( that, "rotation", {
		get: function() { return _rotation; },
		set: function( value ) {
			_rotation = parseFloat( value );
			drawTransform();
		}
	});
	
	defineProperty( that, "scaleX", {
		get: function() { return _scaleX; },
		set: function( value ) {
			_scaleX = parseFloat( value );
			var oW = that.width / _scaleX;
			that.x += ( that.width - oW ) * 0.5;
			drawTransform();
		}
	});
	
	defineProperty( that, "scaleY", {
		get: function() { return _scaleY; },
		set: function( value ) {
			_scaleY = parseFloat( value );
			var oH = that.height / _scaleY;
			that.y += ( that.height - oH ) * 0.5;
			drawTransform();
		}
	});
	
	defineProperty( that, "parent", {
		get: function() { return _parent; },
		set: function( value ) {
			if ( value == null || value.getChildIndex( that ) > -1 ) {
				_parent = value;
				that._sendAddedToStageEvent();
			}
		}
	});
	
	defineProperty( that, "stage", { get: function() { return that.parent ? that.parent.stage : null; } } );
	
	defineProperty( that, "mouse", { get: function() { return _mouse.getRelativePosition( that ); } } );
	
	that.requestFullscreen = function() {
		if ( !ASJS.DisplayObject.FULLSCREEN_ENABLED ) return;
		
		if ( that.domElement.requestFullscreen ) that.domElement.requestFullscreen();
		else if ( that.domElement.webkitRequestFullscreen ) that.domElement.webkitRequestFullscreen();
		else if ( that.domElement.mozRequestFullScreen ) that.domElement.mozRequestFullScreen();
		else if ( that.domElement.msRequestFullscreen ) that.domElement.msRequestFullscreen();
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
	
	that.getCSS = function( key ) { return that.domObject.css( key ); }
	that.setCSS = function( key, value ) { that.domObject.css( key, value ); }
	
	that.addClass = function( value ) { return that.domObject.addClass( value ); }
	that.removeClass = function( value ) { that.domObject.removeClass( value ); }
	
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
	
	that.domObject = $( domElement || "<div />", { 
		tabindex: "-1", 
		style: ( "pointer-events: auto; position: absolute; display: " + _cssDisplay + "; width: 0px; height: 0px; top: 0px; left: 0px;" ) 
	});
	
	function drawTransform() {
		that.setCSS( "transform", 'rotate(' + _rotation + 'deg) scaleX(' + _scaleX + ') scaleY(' + _scaleY + ')' );
	}
	
	(function() {
		that.id = "intance_" + ASJS.DisplayObject.INSTANCE_ID;
		ASJS.DisplayObject.INSTANCE_ID++;
	})();
	
	return that;
};
ASJS.DisplayObject.INSTANCE_ID			= 0;
ASJS.DisplayObject.FULLSCREEN_ENABLED	= document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
