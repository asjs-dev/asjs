function Cookies() {
	return singleton( this, Cookies, function() {
		var that = {};
		
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
				trace( event );
			}
		}
	
		that.readCookie = function( name ) {
			var nameEQ = name + "=";
			var ca = document.cookie.split( ';' );
			var i = -1;
			var l = ca.length;
			while ( ++i < l ) {
				var c = ca[ i ];
				while ( c.charAt( 0 ) == ' ' ) c = c.substring( 1, c.length );
				if ( c.indexOf( nameEQ ) == 0 ) return c.substring( nameEQ.length, c.length );
			}
			try {
				if ( typeof( Storage ) !== "undefined" ) return localStorage[ name ];
			} catch ( event ) {
				trace( event );
			}
			return null;
		}
	
		that.eraseCookie = function( name ) {
			that.createCookie( name, "", -1 );
			try {
				if ( typeof( Storage ) !== "undefined" ) delete localStorage[ name ];
			} catch ( event ) {
				trace( event );
			}
		}
		
		return that;
	});
}
