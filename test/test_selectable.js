var assert = require("assert");
var _ = require("underscore");

describe('query search/apotheke', function () {

    it( "creates selectable.", function (done) {
        var api = require( "../api.js");
        var result = api.selectable( {
            "test" : {
                "name" : "test"
            }
        } );

        assert.ok(_.isObject(result) );
        assert.equal( result.json.test.name, "test" );

        // check interface :::
        assert.ok(_.isFunction(result.first));
        assert.ok(_.isFunction(result.text));
        assert.ok(_.isFunction(result.each));


        var first = result.first( ".test > .name");
        assert.equal( first, "test" );
        assert.ok(_.isString( first ));

        var txt = result.text( ".test > .name");
        assert.equal( txt, "test" );
        assert.ok(_.isString( txt ));

        var count = 0;
        result.each( ".test > .name", function( value, idx ) {
            count++;
        });

        assert.equal( count, 1);
        done();
    });

});