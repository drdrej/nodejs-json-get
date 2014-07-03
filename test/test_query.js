var assert = require("assert");
var _ = require("underscore");

describe('test api.query().', function () {

    it("select -> transform -> .", function (done) {
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

            /* .dump( "c:\\temp\\test-json\\<%= name %>.json" ) */
            .dump( "file://./test/dumped/<%= name %>.json" )
            .done(function() {
                done();
            });
    });


    it("select -> transform -> . (2)", function (done) {
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
            .select( " .persons > * " )
            .transform(function (data) {
                console.log( "## next data element." );
                console.log(data);

                return data;
            })
            .asArray()
            .validate( function( element ) {
                if( !_.isArray(element) ) {
                    done( "ERROR!!! element must be an raay. because merged asArray" );
                    return false;
                }

                return true;
            })
            .finished(done);
    });

    it("select -> transform -> . (3)", function (done) {
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
            .select( " .persons > * " )
            .transform(function (data, options) {
                console.log( "## next data element." );
                console.log(data);

                return data;
            })
            .asArray()
            .split()
            .validate( function( element, options ) {
                if( _.isArray(element) ) {
                    done( "ERROR!!! Element is An array, but must be splitted ..." );
                    return false;
                }

                return true;
            })
            .finished(done);
    });
});



