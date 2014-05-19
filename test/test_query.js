var assert = require("assert");
var _ = require("underscore");

describe('test api.query().', function () {

    it("select -> transform -> .", function (done) {
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
            .select( " .persons > * " )
            .transform(function (data) {
                console.log( "## next data element." );
                console.log(data);

                return data;
            })

            /*  rendert mit Hilfe des geschickten Objekts ein Template. :
             *  ergebnis ist ein content-Objekt.
             *
             *  creates a field $rendered in original object.
             */
            .render( "this is embedded text. Hello <%= name %>!", "$rendered" )

            .dump( "c:\\temp\\test-json\\<%= name %>.json" )
            .finished(done);
    });

});