'use strict';

require( 'should' );
var assert = require( 'assert' );

describe( 'detached HEAD with no remotes or local branches', function () {
	var result;

	before( function ( done ) {

		var gitRefs = require( '../' );

		gitRefs( 'test/fixtures/detached', function ( error, refs ) {
			result = refs;
			done();
		} );
	} );

	it( 'should have current, heads and remotes keys', function () {
		result.should.be.of.type( 'object' );
		result.current.should.be.of.type( 'object' );
		result.heads.should.be.of.type( 'object' );
		result.remotes.should.be.of.type( 'object' );
	} );

	it( 'should have correct current HEAD and no ref', function () {
		result.current.head.should.be.of.type( 'string' ).and.equal( 'd300000000000000000000000000000000000001' );
		assert.strictEqual( result.current.ref, null );
	} );

	it( 'should have no local branches', function () {
		Object.keys( result.heads ).length.should.be.of.type( 'number' ).and.equal( 0 );
	} );

	it( 'should have no remotes', function () {
		Object.keys( result.remotes ).length.should.be.of.type( 'number' ).and.equal( 0 );
	} );

} );
