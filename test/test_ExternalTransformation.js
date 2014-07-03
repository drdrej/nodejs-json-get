var assert = require("assert");
var _ = require("underscore");

describe('test external transformation', function () {

    it("transform( 'path' ) ", function (done) {
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
        })
            .select(" .persons > * ")
            .transform( __dirname + '/transform/addTestVar.js' )
            .validate( function(data) {
                if( data.$test ) {
                    console.log( "-- transformation executed successful");
                    return true;
                } else {
                    console.log( "ERROR: this data not pass previous transformation!" );
                    done( "BROKEN VALIDATION!" );
                }
            })
            .finished(done);
    });

    it("transform( 'file://path' ) ", function (done) {
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
        })
            .select(" .persons > * ")
            .transform( 'file://' + __dirname + '/transform/addTestVar.js' )
            .validate( function(data) {
                if( data.$test ) {
                    console.log( "-- transformation executed successful");
                    return true;
                } else {
                    console.log( "ERROR: this data not pass previous transformation!" );
                    done( "BROKEN VALIDATION!" );
                }
            })
            .finished(done);
    });

});