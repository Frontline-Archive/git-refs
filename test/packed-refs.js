'use strict';

require( 'should' );

describe( 'packed git references from running `git gc`', function () {
	let result;

	before( function ( done ) {
		let gitRefs = require( '../' );

		gitRefs( 'test/fixtures/packed-refs', function ( error, refs ) {
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
		result.current.head.should.be.of.type( 'string' ).and.equal( '12754bb54407d06f401e03386c19133db6d8dd38' );
		result.current.ref.should.be.of.type( 'string' ).and.equal( 'refs/heads/pull/17' );
	} );

	it( 'should have correct local branches', function () {
		result.heads.dev.should.be.of.type( 'string' ).and.equal( '8bc0c5ba5afef2543a73e85c1e2c1fb2b9a57c54' );
	} );

	it( 'should have correct remotes', function () {
		let remotes = result.remotes;

		// Should have (2) remotes (origin and upstream)
		Object.keys( remotes ).length.should.be.of.type( 'number' ).and.equal( 2 );

		// Check origin remote
		remotes.origin.dev.should.be.of.type( 'string' ).and.equal( '071702f03bb4f335777fda365bf0f501dedc7e45' );
		remotes.origin.master.should.be.of.type( 'string' ).and.equal( 'b1fbcb70fb64e26f7ccafb0316791aae379972a6' );
		remotes.origin.pull[ '17' ].should.be.of.type( 'string' ).and.equal( '12754bb54407d06f401e03386c19133db6d8dd38' );

		// Check upstream remote
		remotes.upstream.master.should.be.of.type( 'string' ).and.equal( 'b1fbcb70fb64e26f7ccafb0316791aae379972a6' );
	} );
} );
