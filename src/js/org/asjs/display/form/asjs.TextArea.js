includeOnce( "org/asjs/display/form/asjs.AbstractTextElement.js" );

ASJS.TextArea = function() {
	var that = new ASJS.AbstractTextElement( "<textarea />" );
	return that;
}
