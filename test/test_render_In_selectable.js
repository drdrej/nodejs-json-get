var assert = require("assert");
var _ = require("underscore");

describe('Test selectable().render()', function () {

    it( "render( Underscore:Template )", function (done) {
        var api = require( "../api.js");
        var result = api.selectable( {
            "test" : {
                "name" : "test"
            }
        } );

        assert.ok(_.isObject(result) );
        assert.equal( result.json.test.name, "test" );

        // check interface :::
        assert.ok(_.isFunction(result.first));
        assert.ok(_.isFunction(result.text));
        assert.ok(_.isFunction(result.each));
        assert.ok(_.isFunction(result.exists));
        assert.ok(_.isFunction(result.render));

        var rendered = result.render( "My Name is = <%= text( '.test > .name' ) %>" );
        assert.ok( rendered );
        assert.equal( rendered, 'My Name is = test' );

        var rendered2 = result.render( "My Name is = <%= json.test.name %>" );
        assert.ok( rendered2 );
        assert.equal( rendered2, 'My Name is = test' );

        var rendered3 = result.render( "file://./test/tmpl/test_render_in_selectable.txt.tmpl" );
        assert.ok( rendered3 );
        assert.equal( rendered3, 'My Name is = test' );

        done();
    });

});