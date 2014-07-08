var assert = require("assert");
var _ = require("underscore");

describe('test api.json(null).', function () {

    it("Test create Pipe to consume later.", function (done) {
        var query = require('../api.js').json;

        var pipe = query()
            .select( " .persons > * " )
            .transform(function (data) {
                console.log( "## next data element." );
                console.log(data);

                return data;
            });
    });

});



