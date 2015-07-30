'use strict';

var fs        = require( 'fs' );
var glob      = require( 'glob' );
var path      = require( 'path' );
var ObjManage = require( 'object-manage' );

module.exports = function ( gitDirectory, callback ) {

	// Use the current .git folder if not passed in
	if ( typeof gitDirectory === 'function' ) {
		callback     = gitDirectory;
		gitDirectory = '.git';
	}

	var options = {
		'glob' : { 'nodir' : true },
		'read' : { 'encoding' : 'utf8' }
	};

	// Get all of the references
	function getRefs ( directory ) {

		// Find all the files in the refs folder
		var files = glob.sync( path.join( directory, 'refs', '**', '*' ), options.glob );

		var defaults = {
			'heads'   : {},
			'remotes' : {}
		};

		var refs = new ObjManage( defaults );

		files.forEach( function ( file ) {

			var currentRef   = file.replace( path.join( directory, 'refs' ) + path.sep, '' ).replace( /[\/]/g, '.' );
			var fileContents = fs.readFileSync( file, options.read ).replace( /\n/, '' );

			refs.$set( currentRef, fileContents );
		} );

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
