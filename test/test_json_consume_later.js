var assert = require("assert");
var _ = require("underscore");

describe('test api.json(null).', function () {

    it("Test create Pipe to consume later.", function (done) {
        var query = require('../api.js').json;

        var pipe = query();

        assert.ok(pipe);

        pipe.select( " .persons > * " )
            .validate( function( element ) {
                var _ = require( "underscore" );

                if( element.name  ) {
                    return true;
                }

                return false;
            })
            .done( done );

        var result = pipe.consume({
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
        });
        assert.ok( !result );
    });

});



