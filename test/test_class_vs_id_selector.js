var assert = require("assert");
var _ = require("underscore");

describe('Test: Class vs. ID selector.', function () {

    var selectable = require('../api.js').selectable;

    var selected = selectable({
        person:
        {
            owner: "PERSON/OWNER"
        },

        owner : "OWNER"
    });


    it("select by .class", function (done) {
        var owner = selected.text( ".owner" );
        assert.ok(owner);
        assert.equal( "PERSON/OWNEROWNER", owner );

        done();
    });

    it("select by #id", function (done) {
        var owner = selected.text( "#owner" );
        assert.ok(owner);
        assert.equal( "OWNER", owner );

        done();
    });

});