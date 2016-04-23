function Task() {
	var that = {};
	
	that._onMessage = function( e ) {};
	
	that._postMessage = function( data ) {
		self.postMessage( data );
	};
	
	( function() {
		self.addEventListener( 'message', that._onMessage, false);
	})();
	
	return that;
};
