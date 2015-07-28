'use strict';

require( 'should' );
var assert = require( 'assert' );

describe( 'basic fixture', function () {

	describe( 'referenced HEAD with remotes and local branches', function () {

		var result;

		before( function ( done ) {

			var gitRefs = require( '../' );

			gitRefs( 'test/fixtures/basic', function ( error, refs ) {
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
			result.current.head.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000012' );
			result.current.ref.should.be.of.type( 'string' ).and.equal( 'refs/heads/master' );
		} );

		it( 'should have correct local branches', function () {
			result.heads.dev.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000011' );
			result.heads.master.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000012' );
		} );

		it( 'should have correct remotes', function () {
			var remotes = result.remotes;

			// Should have (2) remotes (origin and upstream)
			Object.keys( remotes ).length.should.be.of.type( 'number' ).and.equal( 2 );

			// Check origin remote
			remotes.origin.dev.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000021' );
			remotes.origin.master.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000022' );

			// Check upstream remote
			remotes.upstream.master.should.be.of.type( 'string' ).and.equal( 'de944492d4164ceffa7600ef96c4ee6f00000032' );
		} );

	} );

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

	describe( 'missing git folder', function () {
		var result;
		var error;

		before( function ( done ) {

			var gitRefs = require( '../' );

			gitRefs( 'test/fixtures/non-existant', function ( err, refs ) {
				result = refs;
				error  = err;
				done();
			} );
		} );

		it( 'should throw error', function () {
			assert.strictEqual( result, undefined );
			error.should.be.of.type( 'object' );
			error.path.should.be.of.type( 'string' ).and.equal( 'test/fixtures/non-existant' );
		} );

	} );

} );
