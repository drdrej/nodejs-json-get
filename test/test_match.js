var assert = require("assert");
var _ = require("underscore");

describe('Test match()', function () {

    var match = require( "../impl/query/match").match;
    var json = {
        "persons" : [
            "Person 1"
        ]
    };

    it( "match( path, obj )", function (done) {
        var selected = match(".persons > *", json)
        assert.ok(selected);
        assert.ok(_.isArray(selected) );
        assert.ok(1, selected.length);
        assert.equal( "Person 1" , selected[0]);

        //assert.equal( "Person 1", element.text() );

        done();
    });


});