var assert = require("assert");
var _ = require("underscore");

describe('Test selectable().text()', function () {

    var api = require( "../api.js");
    var selectable = api.selectable( {
        "person" : {
            "name" : "ABC"
        }
    });

    it( "text( String, null)", function (done) {
        var txt = selectable.text( ".person > .name");
        assert.equal( txt, "ABC" );
        assert.ok(_.isString( txt ));


        done();
    });

    it( "text()", function (done) {
        var txt = selectable.text();
        assert.equal( txt, "ABC" );
        assert.ok(_.isString( txt ));

        done();
    });

    it( "text()", function (done) {
        var txt = api.selectable(undefined).text();
        assert.equal( txt, "" );
        assert.ok(_.isString( txt ));

        done();
    });

});