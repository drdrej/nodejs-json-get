var assert = require("assert");
var _ = require("underscore");

describe('Test: selectable.put()', function () {

    it("put( tmplPath, outputPath )", function (done) {

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
            .asSelectable()
            .transform( function(element, options) {
                element.put( '#hasNewField', true);
                return element;
            })
            .validate( function( element, options) {
               if( element.json.hasNewField ) {
                   done();
                   return true;
               }

               done( "ERROR: model is not modified." );
               return true;
            })
    });

});