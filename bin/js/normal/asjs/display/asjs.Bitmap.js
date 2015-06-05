includeOnce( "js/normal/asjs/display/asjs.DisplayObject.js" );

ASJS.Bitmap = function( bitmapWidth, bitmapHeight ) {
	var that = new ASJS.DisplayObject( "<canvas />" );
	
	var TARGET_FILL = "targetFill";
	var TARGET_STROKE = "targetStroke";
	
	var _drawLine = false;
	var _drawFill = false;
	
	defineProperty( that, "bitmapWidth", {
		get: function() { return that.getAttr( "width" ); },
		set: function( value ) { that.setAttr( "width", value ); }
	});
	
	defineProperty( that, "bitmapHeight", {
		get: function() { return that.getAttr( "height" ); },
		set: function( value ) { that.setAttr( "height", value ); }
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
		getContext().rotate( value * ASJS.DisplayObject.THETA );
	}
	
	that.scale = function( w, h ) {
		getContext().scale( w, h );
	}
	
	that.transform = function( matrix ) {
		getContext().transform( matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f );
	}
	
	that.endLineStyle = function() {
		var ctx = getContext();
		getContext().closePath();
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
	
	that.blendMode = function( value ) {
		getContext().globalCompositeOperation = value;
	}
	
	that.globalAlpha = function( value ) {
		getContext().globalAlpha = value;
	}
	
	that.drawRect = function( x, y, w, h ) {
		var ctx = getContext();
		if ( _drawFill ) ctx.fillRect( x, y, w, h ); 
		if ( _drawLine ) ctx.strokeRect( x, y, w, h );
	}
	
	that.drawCircle = function( x, y, r ) {
		getContext().arc( x, y, r, 0, 2 * Math.PI );
	}
	
	that.drawHTML = function( value ) {
		try {
			rasterizeHTML.drawHTML( value, $( that.domObject )[ 0 ] );
		} catch( e ) {
			throw new Error( "Missing: http://www.github.com/cburgmer/rasterizeHTML.js" );
		}
	}
	
	that.drawImage = function( image, sx, sy, sw, sh, x, y, w, h ) {
		try {
			getContext().drawImage( image.domObject[ 0 ], sx, sy, sw, sh, x, y, w, h );
		} catch ( e ) {
		}
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
	
	that.getDataUrl = function() {
		return getContext().toDataURL();
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
	
	function beginGradientFill( targetType, type, gradientParams, colors ) {
		var ctx = getContext();
		var gradient;
		switch ( type ) {
			case ASJS.Bitmap.GRADIENT_LINEAR: gradient = ctx.createLinearGradient( gradientParams );
			break;
			case ASJS.Bitmap.GRADIENT_RADIAL: gradient = ctx.createRadialGradient( gradientParams );
			break;
		}
		var i;
		var color;
		for ( i = 0; i < colors.length; i++ ) {
			color = colors[ i ];
			addColorToGradient( gradient, color.stop, color.color, color.alpha );
		}
		fillStyle( targetType, gradient );
	}
	
	function beginPatternFill( targetType, image, repeat ) {
		var pattern = getContext().createPattern( image.domObject[ 0 ], repeat || ASJS.Bitmap.PATTERN_REPEAT );
		fillStyle( targetType, pattern );
	}
	
	function getContext() {
		return that.domObject[ 0 ].getContext( "2d" );
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
	
	(function() {
		that.bitmapWidth = bitmapWidth || 1;
		that.bitmapHeight = bitmapHeight || 1;
		//getContext().globalCompositeOperation = "destination-in";
	})();
	
	return that;
}
ASJS.Bitmap.GRADIENT_LINEAR	= "ASJS-Bitmap-gradientLinear";
ASJS.Bitmap.GRADIENT_RADIAL	= "ASJS-Bitmap-gradientRadial";
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
ASJS.Bitmap.LinearGradientData = function( x, y, w, h ) {
	var that = {};
	
	that.x = x || 0;
	that.y = y || 0;
	that.w = w || 0;
	that.h = h || 0;
	
	return that;
}
ASJS.Bitmap.RadialGradientData = function( x0, y0, r0, x1, y1, r1 ) {
	var that = {};
	
	that.x0 = x0 || 0;
	that.y0 = y0 || 0;
	that.r0 = r0 || 0;
	that.x1 = x1 || 0;
	that.y1 = y1 || 0;
	that.r1 = r1 || 0;
	
	return that;
}
ASJS.Bitmap.GradientColorData = function( stop, color, alpha ) {
	var that = {};
	
	that.stop = stop || 0;
	that.color = color || "#0";
	that.alpha = alpha || 1;
	
	return that;
}
