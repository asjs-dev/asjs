includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/display/asjs.Image.js" );
includeOnce( "org/asjs/geom/asjs.Matrix.js" );
includeOnce( "org/asjs/geom/asjs.GeomUtils.js" );

ASJS.Bitmap = function( bitmapWidth, bitmapHeight ) {
	var that = new ASJS.DisplayObject( "<canvas />" );
	
	var TARGET_FILL = "targetFill";
	var TARGET_STROKE = "targetStroke";
	
	var _context;
	
	var _drawLine = false;
	var _drawFill = false;
	
	var _bitmapFilters;
	var _keepOriginal = true;
	var _original;
	
	property( that, "keepOriginal", {
		get: function() { return _keepOriginal; },
		set: function( value ) { _keepOriginal = value; }
	});
	
	property( that, "bitmapFilters", {
		get: function() { return _bitmapFilters; },
		set: function( value ) {
			_bitmapFilters = value;
			executeFilters();
		}
	});
	
	property( that, "bitmapWidth", {
		get: function() { return that.getAttr( "width" ); },
		set: function( value ) {
			var w = Math.max( 1, value || 1 );
			that.setAttr( "width", w );
		}
	});
	
	property( that, "bitmapHeight", {
		get: function() { return that.getAttr( "height" ); },
		set: function( value ) {
			var h = Math.max( 1, value || 1 );
			that.setAttr( "height", h );
		}
	});
	
	property( that, "blendMode", {
		get: function() { return getContext().globalCompositeOperation; },
		set: function( value ) { getContext().globalCompositeOperation = value; }
	});
	
	property( that, "globalAlpha", {
		get: function() { return getContext().globalAlpha; },
		set: function( value ) { getContext().globalAlpha = value; }
	});
	
	that.beginLineColorStyle = function( size, rgb, alpha, miterLimit, lineJoin, lineCap ) {
		beginPath();
		setLineStyle( size, miterLimit, lineJoin, lineCap );
		beginColorFill( TARGET_STROKE, rgb, alpha );
	}
	
	that.beginLineGradientStyle = function( size, type, gradientParams, colors, lineMitter, lineJoin, lineCap ) {
		beginPath();
		setLineStyle( size, miterLimit, lineJoin, lineCap );
		beginGradientFill( TARGET_STROKE, type, gradientParams, colors );
	}
	
	that.beginLinePatternStyle = function( size, image, repeat, lineMitter, lineJoin, lineCap ) {
		beginPath();
		setLineStyle( size, miterLimit, lineJoin, lineCap );
		beginPatternFill( TARGET_STROKE, image, repeat );
	}
	
	that.beginColorFill = function( rgb, alpha ) {
		beginFill();
		beginColorFill( TARGET_FILL, rgb, alpha );
	}
	
	that.beginGradientFill = function( type, gradientParams, colors ) {
		beginFill();
		beginGradientFill( TARGET_FILL, type, gradientParams, colors );
	}
	
	that.beginPatternFill = function( image, repeat ) {
		beginFill();
		beginPatternFill( TARGET_FILL, image, repeat );
	}
	
	that.translate = function( x, y ) {
		getContext().translate( x, y );
	}
	
	that.rotate = function( value ) {
		getContext().rotate( value * ASJS.GeomUtils.THETA );
	}
	
	that.scale = function( w, h ) {
		getContext().scale( w, h );
	}
	
	that.transform = function( matrix ) {
		getContext().transform( matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f );
	}
	
	that.endLineStyle = function() {
		var ctx = getContext();
		if ( _drawLine ) ctx.stroke();
		_drawLine = false;
	}
	
	that.endFill = function() {
		var ctx = getContext();
		getContext().closePath();
		if ( _drawFill ) ctx.fill();
		_drawFill = false;
	}
	
	that.moveTo = function( x, y ) {
		getContext().moveTo( x, y );
	}
	
	that.lineTo = function( x, y ) {
		getContext().lineTo( x, y );
	}
	
	that.drawRect = function( x, y, w, h ) {
		var ctx = getContext();
		if ( _drawFill ) ctx.fillRect( x, y, w, h ); 
		if ( _drawLine ) ctx.strokeRect( x, y, w, h );
	}
	
	that.drawCircle = function( x, y, r ) {
		that.drawArc( x, y, r, 0, 2 * Math.PI );
	}
	
	that.drawArc = function( x, y, r, begin, end, counterclockwise ) {
		getContext().arc( x, y, r, begin, end, counterclockwise );
	}
	
	that.drawHTML = function( value ) {
		try {
			rasterizeHTML.drawHTML( value, that.el );
		} catch( e ) {
			throw new Error( "Missing: http://www.github.com/cburgmer/rasterizeHTML.js" );
		}
	}
	
	that.drawImage = function( image, sx, sy, sw, sh, x, y, w, h ) {
		try {
			getContext().drawImage( image.el, sx, sy, sw, sh, x, y, w, h );
		} catch ( e ) {}
	}
	
	that.textStyle = function( font, align, baseline ) {
		var ctx = getContext();
		ctx.font = font;
		ctx.textAlign = align;
		ctx.textBaseline = baseline;
	}
	
	that.drawText = function( text, x, y ) {
		var ctx = getContext();
		if ( _drawFill ) ctx.fillText( text, x, y );
		if ( _drawLine ) ctx.strokeText( text, x, y );
	}
	
	that.measureText = function( text ) {
		return getContext().measureText( text );
	}
	
	that.clearRect = function( x, y, w, h ) {
		getContext().clearRect( x, y, w, h );
	}
	
	that.getDataUrl = function( type, encoderOptions ) {
		return that.el.toDataURL( type, encoderOptions );
	}
	
	that.getColorRgb = function( x, y ) {
		var color = that.getImageData( x, y, 1, 1 );
		return {
			r: color.data[ 0 ],
			g: color.data[ 1 ],
			b: color.data[ 2 ],
			a: color.data[ 3 ]
		};
	}
	
	that.setColor = function( x, y ) {
		that.drawRect( x, y, 1, 1 );
	}
	
	that.getImageData = function( x, y, w, h ) {
		return getContext().getImageData( x, y, w, h );
	}
	
	that.putImageData = function( imageData, x, y ) {
		getContext().putImageData( imageData, x, y );
	}
	
	that.merge = function( bitmap, srcX, srcY, srcW, srcH, x, y ) {
		that.putImageData( bitmap.getImageData( srcX, srcY, srcW, srcH ), x, y );
	}
	
	that.destroy = function() {
		that.clearRect( 0, 0, that.bitmapWidth, that.bitmapHeight );
		that.setBitmapSize( 1, 1 );
		if ( _original ) _original = null;
	}
	
	that.setBitmapSize = function( width, height ) {
		that.bitmapWidth = width;
		that.bitmapHeight = height;
	}
	
	that.clone = function() {
		var bmp = new ASJS.Bitmap( that.bitmapWidth, that.bitmapHeight );
			bmp.setSize( that.bitmapWidth, that.bitmapHeight );
			bmp.drawImage( that, 0, 0, that.bitmapWidth, that.bitmapHeight, 0, 0, that.bitmapWidth, that.bitmapHeight );
		return bmp;
	}
	
	that.getOriginal = function() {
		var bmp = new ASJS.Bitmap( that.bitmapWidth, that.bitmapHeight );
		if ( _original ) bmp.drawImage( _original, 0, 0, that.bitmapWidth, that.bitmapHeight, 0, 0, that.bitmapWidth, that.bitmapHeight );
		return bmp;
	}
	
	function beginPath() {
		getContext().beginPath();
		_drawLine = true;
	}
	
	function beginFill() {
		getContext().beginPath();
		_drawFill = true;
	}
	
	function addColorToGradient( gradient, stop, color, alpha ) {
		var rgb = hexToRGB( color );
			rgb.a = alpha;
		gradient.addColorStop( stop, rgbToString( rgb ) );
	}
	
	function fillStyle( targetType, value ) {
		var ctx = getContext();
		if ( targetType == TARGET_FILL ) ctx.fillStyle = value;
		else ctx.strokeStyle = value;
	}
	
	function setLineStyle( size, miterLimit, lineJoin, lineCap ) {
		var ctx = getContext();
			ctx.lineWidth = size;
			ctx.miterLimit = miterLimit || 10;
			ctx.lineJoin = lineJoin || ASJS.Bitmap.LINE_JOIN_MITER;
			ctx.lineCap = lineCap || ASJS.Bitmap.LINE_CAP_BUTT;
	}
	
	function beginColorFill( targetType, rgb, alpha ) {
		var rgb = hexToRgb( rgb );
			rgb.a = alpha;
		fillStyle( targetType, rgbToString( rgb ) );
	}
	
	function beginGradientFill( targetType, type, gradientData, colors ) {
		var ctx = getContext();
		var gradient;
		switch ( type ) {
			case ASJS.Bitmap.GRADIENT_LINEAR: gradient = ctx.createLinearGradient( gradientParams );
			break;
			case ASJS.Bitmap.GRADIENT_RADIAL: gradient = ctx.createRadialGradient( gradientParams );
			break;
		}
		var i = -1;
		var l = colors.length;
		var color;
		while ( ++i < l ) {
			color = colors[ i ];
			addColorToGradient( gradient, color.stop, color.color, color.alpha );
		}
		fillStyle( targetType, gradient );
	}
	
	function beginPatternFill( targetType, image, repeat ) {
		var pattern = getContext().createPattern( image.el, repeat || ASJS.Bitmap.PATTERN_REPEAT );
		fillStyle( targetType, pattern );
	}
	
	function getContext() {
		if ( !_context ) _context = that.el.getContext( "2d" );
		return _context;
	}
	
	function rgbToString( rgb ) {
		return "rgba( " + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + rgb.a + " )";
	}
	
	function hexToRgb( value ) {
		var shorthandRegex = /^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i;
		value = value.replace( shorthandRegex, function( m, r, g, b ) {
			return r + r + g + g + b + b;
		});
		
		var result = /^(?:#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( value );
		return result ? {
			r: parseInt( result[1], 16 ),
			g: parseInt( result[2], 16 ),
			b: parseInt( result[3], 16 ),
			a: 1
		} : null;
	}
	
	function executeFilters() {
		var l = that.bitmapFilters.length;
		
		if ( l == 0 ) return;
		
		if ( that.keepOriginal ) {
			if ( !_original ) {
				_original = new ASJS.Image();
				_original.src = that.getDataUrl( "image/png", 1.0 );
			} else {
				that.drawImage( _original, 0, 0, that.bitmapWidth, that.bitmapHeight, 0, 0, that.bitmapWidth, that.bitmapHeight );
				_original = null;
			}
		}
		
		var i = -1;
		var pixels = that.getImageData( 0, 0, that.bitmapWidth, that.bitmapHeight );
		while ( ++i < l ) {
			var filter = that.bitmapFilters[ i ];
			pixels = filter.execute( pixels );
		}
		that.putImageData( pixels, 0, 0 );
	}
	
	(function() {
		if ( !getContext() ) {
			throw new Error( "ASJS.Bitmap (canvas) is not supported in your browser!" );
		}
		that.setBitmapSize( bitmapWidth, bitmapHeight );
	})();
	
	return that;
}
ASJS.Bitmap.GRADIENT_LINEAR		= "ASJS-Bitmap-gradientLinear";
ASJS.Bitmap.GRADIENT_RADIAL		= "ASJS-Bitmap-gradientRadial";
ASJS.Bitmap.PATTERN_REPEAT		= "repeat";
ASJS.Bitmap.PATTERN_NO_REPEAT	= "no-repeat";
ASJS.Bitmap.PATTERN_REPEAT_X	= "repeat-x";
ASJS.Bitmap.PATTERN_REPEAT_Y	= "repeat-y";
ASJS.Bitmap.LINE_CAP_BUTT		= "butt";
ASJS.Bitmap.LINE_CAP_ROUND		= "round";
ASJS.Bitmap.LINE_CAP_SQUARE		= "square";
ASJS.Bitmap.LINE_JOIN_BEVEL		= "bevel";
ASJS.Bitmap.LINE_JOIN_ROUND		= "round";
ASJS.Bitmap.LINE_JOIN_MITER		= "miter";
