function defineProperty( target, propertyName, params ) {
	params.enumerable = true;
	params.configurable = true;
	Object.defineProperty( target, propertyName, params );
}

function extendClass( parent ) {
	return $.extend( true, {}, parent );
}

function extendProperty( target, parent, propertyName ) {
	Object.defineProperty( target, propertyName, Object.getOwnPropertyDescriptor( parent, propertyName ) );
}

function extendFunction( target, parent, propertyName ) {
	target[ propertyName ] = parent[ propertyName ];
}

var ASJS = {};

var includedScript = {};
function includeOnce( filename ) {
	if ( includedScript[ filename ] ) return;
	includedScript[ filename ] = 1;
	$.ajaxSetup( { async: false } );
	$.getScript( filename );
	$.ajaxSetup( { async: true } );
}

ASJS.inited;
var stage;
ASJS.startASJS = function( baseClass ) {
	if ( ASJS.inited ) return;
	ASJS.inited = true;
	$( document ).ready( function() {
		stage = new ASJS.Stage().instance;
		new baseClass();
	});
}

