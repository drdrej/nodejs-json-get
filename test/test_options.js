var assert = require("assert");
var _ = require("underscore");

describe('test passing options', function () {

    it("test external transformation: transform( 'path' ) ", function (done) {
        var query = require('../api.js').json;

        query({
            persons: [
                {
                    name: "AAA"
                },

                {
                    name: "BBB"
                },

                {
                    name: "CCC"
                }
            ]
        }, {
               test : true
            })
            .select(" .persons > * ")
            .transform( function( element, options ) {
                if( !options.test ) {
                    done( "ERROR: option not found" );
                    return;
                }
            })
            .finished(done);
        /*
            .finished(function(options) {
                done();
            });
            */
    });

});