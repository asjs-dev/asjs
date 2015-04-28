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
	
		that.createCookie = function( name, value, days ) {
			if ( days ) {
				var date = new Date();
				date.setTime( date.getTime() + ( days * 86400000 ) );
				var expires = "; expires=" + date.toGMTString();
			} else var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
			try {
				if ( typeof( Storage ) !== "undefined" ) localStorage[ name ] = value;
			} catch ( event ) {
				console.log( event );
			}
		}
	
		that.readCookie = function( name ) {
			var nameEQ = name + "=";
			var ca = document.cookie.split( ';' );
			for ( var i = 0; i < ca.length; i++ ) {
				var c = ca[ i ];
				while ( c.charAt( 0 ) == ' ' ) c = c.substring( 1, c.length );
				if ( c.indexOf( nameEQ ) == 0 ) return c.substring( nameEQ.length, c.length );
			}
			try {
				if ( typeof( Storage ) !== "undefined" ) return localStorage[ name ];
			} catch ( event ) {
				console.log( event );
			}
			return null;
		}
	
		that.eraseCookie = function( name ) {
			that.createCookie( name, "", -1 );
			try {
				if ( typeof( Storage ) !== "undefined" ) delete localStorage[ name ];
			} catch ( event ) {
				console.log( event );
			}
		}
	
		/* CONSTRUCTOR */{}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Tools.$ ) Tools.$ = new ToolsInstance();
			return Tools.$;
		}
	});
}
