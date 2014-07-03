var assert = require("assert");
var _ = require("underscore");

describe('Test each() over array of strings', function () {

    var api = require( "../api.js");
    var selectable = api.selectable( {
        "persons" : [
            "Person 1"
        ]
    });

    it( "persons.each()", function (done) {
        selectable.each( ".persons > *", function( element ) {
            assert.ok(element);
            assert.ok( _.isObject( element ));

            assert.ok(_.isFunction(element.first));
            assert.ok(_.isFunction(element.text));
            assert.ok(_.isFunction(element.each));
            assert.ok(_.isFunction(element.exists));

            assert.equal( "Person 1", element.text() );
        });

        done();
    });


});