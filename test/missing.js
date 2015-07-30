'use strict';

require( 'should' );
var assert = require( 'assert' );

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
