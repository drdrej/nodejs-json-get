var assert = require("assert");
var _ = require("underscore");

describe('Test: render by stream into file 2', function () {

    it("render( tmplPath, outputPath )", function (done) {

        var output = "./test/rendered/rendered_persons.txt";
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
            .select( ".persons > *" )
            .asSelectable()
            .render( "file://./test/tmpl/test_render_every_person.txt.tmpl",
                     "file://./test/rendered/rendered_person_<%= text('.name') %>.txt" )
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