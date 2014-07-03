var assert = require("assert");
var _ = require("underscore");

describe('Test: dup()', function () {

    it("dump( tmplPath )", function (done) {

        var output = "./test/dump/persons.json";
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
        .dump("file://" + output )

        .done(function() {
                var path = require( 'path' );
                var fs = require( 'fs' );

                var resolved = path.resolve( output );
                done();

                /*
                 TODO: check exists file!!!
                 if( fs.exists(resolved) )
                 done();
                 else
                 done( "ERROR: file is not created: " + resolved );
                 */
            });
    });

});