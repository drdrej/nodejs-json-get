var assert = require("assert");
var _ = require("underscore");

describe('test selectable stream of json sub-objects.', function () {

    it( "select simple entry in json by stream.", function (done) {

        var select = require( '../impl/io/select.js').select;
        var stream = select( {
            "test" : {
                "name" : "test"
            }
        }, ".test > .name" );

        var counter = 0;

        stream.on('data', function(data) {
            assert.equal( data, "test" );
            counter++;
        });

        stream.on('end', function() {
            assert.equal(counter, 1);
            done();
        });
    });

});