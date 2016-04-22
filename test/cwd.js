'use strict';

require( 'should' );
const assert = require( 'assert' );

describe( 'current (cwd) directory HEAD with remotes and local branches', function () {
	let result, error;

	before( function ( done ) {
		let gitRefs = require( '../' );

		// By not passing in a `gitDirectory` it will use the current git folder
		gitRefs( function ( err, refs ) {
			result = refs;
			error  = err;
			done();
		} );
	} );

	it( 'should not have thrown an error', function () {
		assert.strictEqual( error, null );
	} );

	it( 'should have current, heads and remotes keys', function () {
		result.should.be.of.type( 'object' );
		result.current.should.be.of.type( 'object' );
		result.heads.should.be.of.type( 'object' );
		result.remotes.should.be.of.type( 'object' );
	} );

	it( 'should have correct current HEAD', function () {
		result.current.head.should.be.of.type( 'string' ).and.be.lengthOf( 40 );
	} );
} );
