function Tools() {
	function ToolsInstance() {
		var that = {};
	
		var _urlParams = {};
	
		that.elementExists = function( element ) {	
			return $( element ).length;
		}
	
		that.replaceText = function( text, data ) {
			for ( var key in data ) text = text.split( "{{" + key + "}}" ).join( data[ key ] );
			return text;
		}
	
		that.isValidEmailAddress = function( email ) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test( email );
		}
	
		that.getURLParams = function( param ) {
			var url = decodeURIComponent( $( location ).attr( 'href' ) ).split( "#" );
			if ( url[ 1 ] == '' || url[ 1 ] == undefined ) return [];
			var params = url[ 1 ].split( '&' );
			for ( var i = 0; i < params.length; i++ ) {
				line = params[ i ].split( '=' );
				_urlParams[ line[ 0 ] ] = line[ 1 ];
			}
			return _urlParams[ param ];
		}
	
		that.createUrlParams = function( params ) {
			var url = "";
			for ( var key in params ) {
				if ( url != "" ) url += "&";
				url += key + "=" + params[ key ];
			}
			document.location.href = '#' + url;
			that.reload();
		}
	
		that.reload = function() {
			window.location.reload( true );
		}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Tools.$ ) Tools.$ = new ToolsInstance();
			return Tools.$;
		}
	});
}
