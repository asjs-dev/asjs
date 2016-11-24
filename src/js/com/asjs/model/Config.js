includeOnce( "org/asjs/mvc/model/asjs.AbstractModel.js" );

function Config() {
	return singleton( Config, function() {
		var that = new ASJS.AbstractModel();
		return that;
	});
}
