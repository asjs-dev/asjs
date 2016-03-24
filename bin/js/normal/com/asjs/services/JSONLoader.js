includeOnce( "org/asjs/net/asjs.Loader.js" );

function JSONLoader() {
	var that = new ASJS.Loader();
	
	( function() {
		that.dataType = "json";
	})();
	
	return that;
}
