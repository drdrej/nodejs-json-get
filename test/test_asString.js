var assert = require("assert");
var _ = require("underscore");

describe('Test asString() function', function () {

    it( "string to string", function (done) {
        var api = require( "../api.js");
        var result = api.asText( "test" );

        assert.ok( result );
        assert.equal( result, "test" );

        done();
    });

    it( "string to trimmed string", function (done) {
        var api = require( "../api.js");
        var result = api.asText( " test ", {
            trim: true
        });

        assert.ok( result );
        assert.equal( result, "test" );

        done();
    });

    it( "array of strings to string", function (done) {
        var api = require( "../api.js");
        var result = api.asText( ["test", "has", "lines"] );

        assert.ok( result );
        assert.equal( result, "testhaslines" );

        done();
    });
});