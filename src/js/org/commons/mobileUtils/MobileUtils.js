includeOnce( "org/asjs/display/asjs.Stage.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

function MobileUtils() {
	function MobileUtilsInstance() {
		var that = {};
		
		var _dpi;
		var _baseWidth;
		
		var _defaultFixedPortrait;
		var _defaultUseDPI;
		var _useScreenSize;
		
		defineProperty( that, "defaultFixedPortrait", {
			set: function( value ) { _defaultFixedPortrait = value; },
			get: function() { return _defaultFixedPortrait; }
		});
		
		defineProperty( that, "defaultUseDPI", {
			set: function( value ) { _defaultUseDPI = value; },
			get: function() { return _defaultUseDPI; }
		});
		
		defineProperty( that, "useScreenSize", {
			set: function( value ) { _useScreenSize = value; },
			get: function() { return _useScreenSize; }
		});
		
		defineProperty( that, "baseWidth", {
			set: function( value ) { _baseWidth = value; },
			get: function() { return _baseWidth; }
		});
		
		defineProperty( that, "width", {
			get: function() { return _useScreenSize ? stage.screenWidth : stage.stageWidth; }
		});
		
		defineProperty( that, "height", {
			get: function() { return _useScreenSize ? stage.screenHeight : stage.stageHeight; }
		});
		
		that.getOrientation = function() {
			return that.width > that.height ? MobileUtils.ORIENTATION_LANDSCAPE : MobileUtils.ORIENTATION_PORTRAIT;
		}
		
		that.getDPI = function() {
			return _dpi;
		}
		
		that.getScreenWidth = function( fixedPortrait ) {
			return fixedPortrait || that.defaultFixedPortrait ? that.width : Math.min( that.width, that.height );
		}
		
		that.getRatio = function( fixedPortrait ) {
			return that.getScreenWidth( fixedPortrait ) / that.baseWidth;
		}
		
		that.convertRatio = function( value, fixedPortrait, useDPI ) {
			return ( that.getRatio( fixedPortrait ) * value ) * ( useDPI || that.defaultUseDPI ? that.getDPI() : 1 );
		}
		
		that.preventMobileScrolling = function() {
			stage.addEventListener( ASJS.MouseEvent.TOUCH_MOVE, function( e ) { e.preventDefault(); } );
		}
		
		( function() {
			_dpi = Math.max( 1, ( stage.window.devicePixelRatio || ( stage.window.screen.deviceXDPI / stage.window.screen.logicalXDPI ) || 1 ) * 0.5 );
			_baseWidth = 0;
			
			_defaultFixedPortrait = false;
			_defaultUseDPI = false;
			_useScreenSize = false;
		})();
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !MobileUtils.$ ) MobileUtils.$ = new MobileUtilsInstance();
			return MobileUtils.$;
		}
	});
}
MobileUtils.ORIENTATION_LANDSCAPE	= "MobileUtils-orientationLandscape";
MobileUtils.ORIENTATION_PORTRAIT	= "MobileUtils-orientationPortrait";
