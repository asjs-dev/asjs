includeOnce( "js/normal/asjs/asjs.Stage.js" );

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
/*
function sizeOf( object ) {
	var objectList = [];
	var stack = [ object ];
	var bytes = 0;

	try {
		while ( stack.length ) {
		    var value = stack.pop();

		    if ( typeof value === 'boolean' ) bytes += 4;
		    else if ( typeof value === 'string' ) bytes += value.length * 2;
		    else if ( typeof value === 'number' ) bytes += 8;
		    else if ( typeof value === 'object' && objectList.indexOf( value ) === -1 ) {
		        objectList.push( value );
		        for( var i in value ) stack.push( value[ i ] );
		    }
		}
    } catch ( e ) {
    	bytes = -1;
    }
    
    return bytes;
}
*/
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

