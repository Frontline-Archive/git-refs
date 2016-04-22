'use strict';

require( 'should' );
const assert = require( 'assert' );

describe( 'pull request referenced HEAD with remotes and local branches', function () {
	let result, error;

	before( function ( done ) {
		let gitRefs = require( '../' );

		gitRefs( 'test/fixtures/pull', function ( err, refs ) {
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
		result.current.head.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000002' );
		result.current.ref.should.be.of.type( 'string' ).and.equal( 'refs/heads/pull/2' );
	} );

	it( 'should have correct local branches', function () {
		result.heads.dev.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000011' );
		result.heads.master.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000012' );
	} );

	it( 'should have correct remotes', function () {
		let remotes = result.remotes;

		// Should have (2) remotes (origin and upstream)
		Object.keys( remotes ).length.should.be.of.type( 'number' ).and.equal( 2 );

		// Check origin remote
		remotes.origin.dev.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000021' );
		remotes.origin.master.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000022' );

		// Check upstream remote
		remotes.upstream.master.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000032' );
	} );
} );
