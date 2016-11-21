function property( target, propertyName, params ) {
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

function singleton( scope, c, i ) {
	property( scope, "instance", {
		get: function() {
			if ( !c.$ ) c.$ = new i();
			return c.$;
		}
	});
}

function is( a, b ) {
	var c = new b();
	var is = true;
	for ( var key in c ) {
		if ( !a[ key ] ) is = false;
	}
	c = null;
	return is;
}

function cast( a, b ) {
	return is( a, b ) ? a : null;
}

function extendFunction( target, parent, propertyName ) {
	target[ propertyName ] = parent[ propertyName ];
}

function trace() {
	console.log( arguments );
}

var sourcePath = "";
function sourcePath( value ) {
	if ( sourcePath != "" ) return;
	sourcePath = value;
}

var includedScript = {};
function includeOnce( filename ) {
	if ( includedScript[ filename ] ) return;
	includedScript[ filename ] = 1;
	$.ajaxSetup( { async: false } );
	$.getScript( sourcePath + filename );
	$.ajaxSetup( { async: true } );
}

var stage;
var ASJS = {};

ASJS.inited;
ASJS.start = function( baseClass ) {
	if ( ASJS.inited ) return;
	ASJS.inited = true;
	$(document).ready(function() {
		stage = new ASJS.Stage().instance;
		stage.init();
		new baseClass();
	});
}

