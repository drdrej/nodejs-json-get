var assert = require("assert");
var _ = require("underscore");

describe('test api.query().', function () {

    it("test external transformation: transform( 'path' ) ", function (done) {
        var query = require('../api.js').query;

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
        })
            .select(" .persons > * ")
            .transform( __dirname + '/transform/addTestVar.js' )
            .validate( function(data) {
                if( data.$test ) {
                    console.log( "-- transformation executed successful");
                } else {
                    console.log( "ERROR: this data not pass previous transformation!" );
                    done( "BROKEN VALIDATION!" );
                }
            })
            .finished(done);
    });

});