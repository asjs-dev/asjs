includeOnce( "org/asjs/display/asjs.Stage.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

function MobileUtils() {
	return singleton( MobileUtils, function() {
		var that = {};
		
		var _window = new ASJS.Window();
	
		var _dpi;
		var _baseSize;
		
		var _type;
		var _useDPI;
		var _useScreenSize;
		
		property( that, "type", {
			set: function( value ) { _type = value; },
			get: function() { return _type; }
		});
		
		property( that, "useDPI", {
			get: function() { return _useDPI; },
			set: function( value ) {
				_useDPI = value;
				calcDPI();
			}
		});
		
		property( that, "useScreenSize", {
			set: function( value ) { _useScreenSize = value; },
			get: function() { return _useScreenSize; }
		});
		
		property( that, "baseSize", {
			get: function() { return _baseSize; },
			set: function( value ) {
				_baseSize = value;
				calcDPI();
			}
		});
		
		property( that, "width", {
			get: function() { return _useScreenSize ? stage.screenWidth : stage.stageWidth; }
		});
		
		property( that, "height", {
			get: function() { return _useScreenSize ? stage.screenHeight : stage.stageHeight; }
		});
		
		that.getOrientation = function() {
			return that.width > that.height ? MobileUtils.ORIENTATION_LANDSCAPE : MobileUtils.ORIENTATION_PORTRAIT;
		}
		
		that.getBrowserOrientation = function() {
			return stage.stageWidth > stage.stageHeight ? MobileUtils.ORIENTATION_LANDSCAPE : MobileUtils.ORIENTATION_PORTRAIT;
		}
		
		that.getDeviceOrientation = function() {
			return stage.screenWidth > stage.screenHeight ? MobileUtils.ORIENTATION_LANDSCAPE : MobileUtils.ORIENTATION_PORTRAIT;
		}
		
		that.getDPI = function() {
			return _dpi;
		}
		
		that.getScreenWidth = function( fixedPortrait ) {
			if ( fixedPortrait ) return that.width;
			switch ( that.type ) {
				case MobileUtils.TYPE_WIDTH: return that.width;
				break;
				case MobileUtils.TYPE_HEIGHT: return that.height;
				break;
				case MobileUtils.TYPE_MINIMUM: return Math.min( that.width, that.height );
				break;
				case MobileUtils.TYPE_MAXIMUM: Math.max( that.width, that.height );
				break;
			}
		}
		
		that.getRatio = function( fixedPortrait ) {
			return that.getScreenWidth( fixedPortrait ) / that.baseSize;
		}
		
		that.convertRatio = function( value, fixedPortrait, useDPI ) {
			return Math.floor( ( that.getRatio( fixedPortrait ) * value ) * ( useDPI || that.useDPI ? that.getDPI() : 1 ) );
		}
		
		that.preventMobileScrolling = function() {
			stage.addEventListener( ASJS.MouseEvent.TOUCH_MOVE, function( e ) { e.preventDefault(); } );
		}
		
		function calcDPI() {
			_dpi = Math.min( 2, Math.max( 1, _window.devicePixelRatio || ( _window.screen.deviceXDPI / _window.screen.logicalXDPI ) || 1 ) );
		}
		
		( function() {
			_dpi = 1;
			
			_baseSize = 0;
			
			_type = MobileUtils.TYPE_WIDTH;
			_useDPI = false;
			_useScreenSize = false;
		})();
		
		return that;
	});
}
MobileUtils.ORIENTATION_LANDSCAPE	= "MobileUtils-orientationLandscape";
MobileUtils.ORIENTATION_PORTRAIT	= "MobileUtils-orientationPortrait";
MobileUtils.TYPE_MINIMUM			= "MobileUtils-typeMin";
MobileUtils.TYPE_MAXIMUM			= "MobileUtils-typeMax";
MobileUtils.TYPE_WIDTH				= "MobileUtils-typeWidth";
MobileUtils.TYPE_HEIGHT				= "MobileUtils-typeHeight";
