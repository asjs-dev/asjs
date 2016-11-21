includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/geom/asjs.Point.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );

ASJS.Scale9Grid = function() {
	var that = new ASJS.Sprite();
	
	var _size = new ASJS.Point();
	var _rectangle = new ASJS.Rectangle();
	var _blocks = [];
	var _super = {};
	
	extendProperty( _super, that, "x" );
	property( that, "x", {
		set: function( value ) {
			_super.x = value;
			that.drawNow();
		}
	});
	
	extendProperty( _super, that, "y" );
	property( that, "y", {
		set: function( value ) {
			_super.y = value;
			that.drawNow();
		}
	});
	
	extendProperty( _super, that, "width" );
	property( that, "width", {
		set: function( value ) {
			_super.width = value;
			that.drawNow();
		}
	});
	
	extendProperty( _super, that, "height" );
	property( that, "height", {
		set: function( value ) {
			_super.height = value;
			that.drawNow();
		}
	});
	
	property( that, "size", {
		get: function() { return _size; },
		set: function( value ) {
			_size = value;
			that.drawNow();
		}
	});
	
	property( that, "rect", {
		get: function() { return _rectangle; },
		set: function( value ) {
			_rectangle = value;
			that.drawNow();
		}
	});
	
	extendFunction( _super, that, "setSize" );
	that.setSize = function( w, h ) {
		_super.setSize( w, h );
		that.drawNow();
	}
	
	that.drawNow = function() {
		var rightSize = _size.x - ( _rectangle.x + _rectangle.width );
		var bottomSize = _size.y - ( _rectangle.y + _rectangle.height );
		
		var center = new ASJS.Point(
			that.width - _rectangle.x - rightSize,
			that.height - _rectangle.y - bottomSize
		);
		
		var percent = new ASJS.Point(
			Math.round( center.x / _rectangle.width ),
			Math.round( center.y / _rectangle.height )
		);
		
		var tl = new ASJS.Point(
			- ( percent.x * _rectangle.x ) * 2,
			- ( percent.y * _rectangle.y ) * 2
		);
		
		var br = new ASJS.Point(
			percent.x * rightSize,
			percent.y * bottomSize
		);
		
		var ps = new ASJS.Point(
			( _size.x * percent.x ) * 2,
			( _size.y * percent.y ) * 2
		);
		
		_blocks[ 0 ].setSize( _rectangle.x, _rectangle.y );
		_blocks[ 1 ].setSize( that.width - _rectangle.x - rightSize, _rectangle.y );
		_blocks[ 2 ].setSize( that.width - _blocks[ 0 ].width - _blocks[ 1 ].width, _rectangle.y );
		_blocks[ 3 ].setSize( _rectangle.x, that.height - _rectangle.y - bottomSize );
		_blocks[ 4 ].setSize( _blocks[ 1 ].width, _blocks[ 3 ].height );
		_blocks[ 5 ].setSize( _blocks[ 2 ].width, _blocks[ 3 ].height );
		_blocks[ 6 ].setSize( _rectangle.x, that.height - _blocks[ 0 ].height - _blocks[ 3 ].height );
		_blocks[ 7 ].setSize( _blocks[ 1 ].width, _blocks[ 6 ].height );
		_blocks[ 8 ].setSize( _blocks[ 2 ].width, _blocks[ 6 ].height );
		
		_blocks[ 1 ].x = _blocks[ 0 ].width;
		_blocks[ 2 ].x = _blocks[ 1 ].x + _blocks[ 1 ].width;
		_blocks[ 3 ].y = _blocks[ 0 ].height;
		_blocks[ 4 ].move( _blocks[ 3 ].width, _blocks[ 1 ].height );
		_blocks[ 5 ].move( _blocks[ 4 ].x + _blocks[ 4 ].width, _blocks[ 1 ].height );
		_blocks[ 6 ].y = _blocks[ 3 ].y + _blocks[ 3 ].height;
		_blocks[ 7 ].move( _blocks[ 6 ].width, _blocks[ 6 ].y );
		_blocks[ 8 ].move( _blocks[ 7 ].x + _blocks[ 7 ].width, _blocks[ 6 ].y );
		
		_blocks[ 1 ].setCSS( "background-position", tl.x + "px top" );
		_blocks[ 1 ].setCSS( "background-size", ps.x + "px " + _size.y + "px" );
		
		_blocks[ 3 ].setCSS( "background-position", "left " + tl.y + "px" );
		_blocks[ 3 ].setCSS( "background-size",  _size.x + "px " + ps.y + "px" );
		
		_blocks[ 4 ].setCSS( "background-position", tl.x + "px " + tl.y + "px" );
		_blocks[ 4 ].setCSS( "background-size",  ps.x + "px " + ps.y + "px" );
		
		_blocks[ 5 ].setCSS( "background-position", "right " + tl.y + "px" );
		_blocks[ 5 ].setCSS( "background-size",  _size.x + "px " + ps.y + "px" );
		
		_blocks[ 7 ].setCSS( "background-position", tl.x + "px bottom" );
		_blocks[ 7 ].setCSS( "background-size", ps.x + "px " + _size.y + "px" );
	}
	
	property( that, "backgroundImage", {
		set: function( value ) {
			var i = -1;
			var l = 9;
			while ( ++i < l ) {
				_blocks[ i ].setCSS( "background-image", "url(" + value + ")" );
			}
			that.drawNow();
		}
	});
	
	function init() {
		var i = -1;
		var l = 9;
		while ( ++i < l ) {
			_blocks[ i ] = new ASJS.Sprite();
			_blocks[ i ].setCSS( "background-repeat", "no-repeat" );
			that.addChild( _blocks[ i ] );
		}
		
		_blocks[ 0 ].setCSS( "background-position", "left top" );
		_blocks[ 2 ].setCSS( "background-position", "right top" );
		_blocks[ 6 ].setCSS( "background-position", "left bottom" );
		_blocks[ 8 ].setCSS( "background-position", "right bottom" );
	}
	
	(function() {
		init();
	})();
	
	return that;
}
