var assert = require("assert");
var _ = require("underscore");

describe('Test selectable().list()', function () {

    var api = require( "../api.js");
    var selectable = api.selectable( {
        "person" : [{
            "name" : "ABC"
         },
            {
              name : "EFB"
            }
        ]
    });


    it( "text(String, String, String)", function (done) {
        var txt = selectable.list( ".person > *", "Name: <%= text() %>", ", ");
        assert.equal( txt, "Name: ABC, Name: EFB" );
        assert.ok(_.isString( txt ));

        done();
    });

    it( "text( String, null, null)", function (done) {
        var txt = selectable.list( ".person > *");
        assert.equal( txt, "ABC, EFB" );
        assert.ok(_.isString( txt ));

        done();
    });


});