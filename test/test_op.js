var assert = require("assert");
var _ = require("underscore");

describe('test exec operation', function () {

    it("Test operations: op( fnc ) ", function (done) {
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
            .tool( function( element, ready ) {
                assert.ok(element);
                ready();
            })
            .validate( function(element) {
                assert.ok(element);
                return true;
            })
            .finished(done);
    });

});