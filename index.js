'use strict';

var fs   = require( 'fs' );
var glob = require( 'glob' );
var path = require( 'path' );

module.exports = function ( gitDirectory, callback ) {

	if ( typeof gitDirectory === 'function' ) {
		callback     = gitDirectory;
		gitDirectory = '.git';
	}

	var options = {
		'glob' : { 'nodir' : true },
		'read' : { 'encoding' : 'utf8' }
	};

	// Recursive function to find a reference from an object using a string, e.g. 'object.key.used'
	function fetchFromObject ( object, property ) {
		if ( typeof object === 'undefined' ) {
			throw new Error( 'Can\'t find reference' );
		}

		var index = property.indexOf( '.' );

		if ( index > -1 ) {
			return fetchFromObject( object[ property.substring( 0, index ) ], property.substr( index + 1 ) );
		}

		return object[ property ];
	}

	// Get all of the local branch heads
	function getHeads ( directory ) {
		var heads = {};
		var files = glob.sync( path.join( directory, 'refs', 'heads', '*' ) );

		files.forEach( function ( file ) {
			var ref = file.split( /[\/]/ );
			heads[ ref[ ref.length - 1 ] ] = fs.readFileSync( file, options.read ).replace( /\n/, '' );
		} );

		return heads;
	}

	// Get all of the remotes
	function getRemotes ( directory ) {
		var remotes = {};
		var files   = glob.sync( path.join( directory, 'refs', 'remotes', '**', '*' ), options.glob );

		files.forEach( function ( file ) {
			var ref = file.split( /[\/]/ );

			// Create remote name key if it doesn't exist
			if ( !remotes[ ref[ ref.length - 2 ] ] ) {
				remotes[ ref[ ref.length - 2 ] ] = {};
			}

			remotes[ ref[ ref.length - 2 ] ][ ref[ ref.length - 1 ] ] = fs.readFileSync( file, options.read ).replace( /\n/, '' );
		} );

		return remotes;
	}

	// Get the current HEAD
	function getHEAD ( directory, refs ) {
		var current = {
			'head' : fs.readFileSync( path.join( directory, 'HEAD' ), options.read ).replace( /\n/, '' ),
			'ref'  : null
		};

		// Find actual reference if it points to another location
		if ( current.head.match( 'ref' ) ) {
			current.ref = current.head.split( /\s+/ )[ 1 ];
			var keys = current.ref.split( /[\/]/ );
			keys.shift();
			current.head = fetchFromObject( refs, keys.join( '.' ) );
		}

		return current;
	}

	try {
		fs.accessSync( gitDirectory, fs.F_OK );

		var refs = {};

		refs.heads   = getHeads( gitDirectory );
		refs.remotes = getRemotes( gitDirectory );
		refs.current = getHEAD( gitDirectory, refs );

		callback( null, refs );
	} catch ( error ) {
		callback( error );
	}
};
