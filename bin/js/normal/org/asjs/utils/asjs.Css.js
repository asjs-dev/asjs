includeOnce( "org/asjs/display/asjs.Stage.js" );

ASJS.Css = function() {
	function CssInstance() {
		var that = {};
		/*
		css.createClass( "div", {
			"background-color": "#336699",
		});

		css.updateClass( "div", {
			"background-color": "#996633",
		});

		css.removeClass( "div" );
		*/
		var _classes = {};
		var _style = $( "<style />" );
	
		that.hasClass = function( selector ) {
			return _classes[ selector ] != undefined;
		}
	
		that.createClass = function( selector, values ) {
			if ( that.hasClass( selector ) ) return false;
			_classes[ selector ] = values;
			buildStyleSheet();
			return true;
		}
	
		that.updateClass = function( selector, values ) {
			if ( that.createClass( selector, values ) ) return true;
			for ( var key in values ) _classes[ selector ][ key ] = values[ key ];
			buildStyleSheet();
		}
	
		that.removeClass = function( selector ) {
			if ( !that.hasClass( selector ) ) return;
			_classes[ selector ] = null;
			delete _classes[ selector ];
			buildStyleSheet();
		}
	
		function buildStyleSheet() {
			var styleSheet = "";
			for ( var classKey in _classes ) {
				styleSheet += classKey + " {\n";
				for ( var valueKey in _classes[ classKey ] ) styleSheet += "	" + valueKey + ": " + _classes[ classKey ][ valueKey ] + ";\n";
				styleSheet += "};\n";
			}
			_style.text( styleSheet );
		}
	
		(function() {
			stage.head.append( _style );
		})();
		
		return that;
	};
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !ASJS.Css.$ ) ASJS.Css.$ = new CssInstance();
			return ASJS.Css.$;
		}
	});
}
