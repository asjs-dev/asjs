includeOnce( "org/asjs/display/asjs.Stage.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

function MobileUtils() {
	function MobileUtilsInstance() {
		var that = {};
		
		var _baseWidth = 0;
		
		defineProperty( that, "baseWidth", {
			set: function( value ) { _baseWidth = value; },
			get: function() { return _baseWidth; }
		});
		
		that.getOrientation = function() {
			return stage.stageWidth > stage.stageHeight ? MobileUtils.ORIENTATION_LANDSCAPE : MobileUtils.ORIENTATION_PORTRAIT;
		}
		
		that.getScreenWidth = function( fixedPortrait ) {
			return fixedPortrait ? stage.stageWidth : Math.min( stage.stageWidth, stage.stageHeight );
		}
		
		that.getRatio = function( fixedPortrait ) {
			console.log( that.getScreenWidth( fixedPortrait ) + " / " + that.baseWidth );
			return that.getScreenWidth( fixedPortrait ) / that.baseWidth;
		}
		
		that.convertRatio = function( value, fixedPortrait ) {
			return that.getRatio( fixedPortrait ) * value;
		}
		
		that.preventMobileScrolling = function() {
			stage.addEventListener( ASJS.MouseEvent.TOUCH_MOVE, function( e ) { e.preventDefault(); } );
		}
		
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
