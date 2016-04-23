'use strict';

require( 'should' );

describe( 'packed git references from running `git gc` with new basic commits', function () {
	let result;

	before( function ( done ) {
		let gitRefs = require( '../' );

		gitRefs( 'test/fixtures/packed-refs-and-basic', function ( error, refs ) {
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

	it( 'should have correct current HEAD', function () {
		result.current.head.should.be.of.type( 'string' ).and.equal( 'ed9c92b3d4585aa109cccefcc204599222476911' );
		result.current.ref.should.be.of.type( 'string' ).and.equal( 'refs/heads/dev' );
	} );

	it( 'should have correct local branches', function () {
		result.heads.dev.should.be.of.type( 'string' ).and.equal( 'ed9c92b3d4585aa109cccefcc204599222476911' );
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
