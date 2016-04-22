'use strict';

var fs        = require( 'fs' );
var glob      = require( 'glob' );
var ObjManage = require( 'object-manage' );
var path      = require( 'path' );

module.exports = function ( gitDirectory, callback ) {
	var defaults = {
		'heads'   : {},
		'remotes' : {}
	};

	var refs = new ObjManage( defaults );

	// Use the current .git folder if not passed in
	if ( typeof gitDirectory === 'function' ) {
		callback     = gitDirectory;
		gitDirectory = '.git';
	}

	var options = {
		'glob' : { 'nodir' : true },
		'read' : { 'encoding' : 'utf8' }
	};

	function getRefsFiles ( directory ) {
		// Find all the files in the refs folder
		var files = glob.sync( path.join( directory, 'refs', '**', '*' ), options.glob );

		files.forEach( function ( filePath ) {

			var currentRef   = filePath.replace( path.join( directory, 'refs' ) + path.sep, '' ).replace( /[\/]/g, '.' );
			var fileContents = fs.readFileSync( filePath, options.read ).replace( /\n/, '' );

			refs.$set( currentRef, fileContents );
		} );
	}

	function getRefs ( directory ) {
		getRefsFiles( directory );

		// Set the current head
		var current = fs.readFileSync( path.join( directory, 'HEAD' ), options.read ).replace( /\n/, '' );

		refs.$set( 'current.head', current );
		refs.$set( 'current.ref', null );

		// Find actual reference if it points to another location
		if ( current.match( 'ref' ) ) {
			var referencePath = current.split( /\s+/ )[ 1 ];
			refs.$set( 'current.ref', referencePath );
			// Get the key to find the reference
			var key = referencePath.replace( /refs[\/]/, '' ).split( /[\/]/ );

			refs.$set( 'current.head', refs.$get( key ) );
		}

		return refs;
	}

	try {
		fs.accessSync( gitDirectory, fs.F_OK );

		callback( null, getRefs( gitDirectory ) );
	} catch ( error ) {
		callback( error );
	}
};
