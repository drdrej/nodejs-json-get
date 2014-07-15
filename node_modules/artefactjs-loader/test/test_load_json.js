var assert = require("assert");
var _ = require("underscore");

describe('Test load json', function () {

    it( "load(path to json) - absolute path exists", function (done) {

        var lib = require('../lib');
        var path = __dirname + '/./test.json';
        var json = lib.json( path );

        assert.ok(json);

        var Path = require( 'path' );
        assert.equal( Path.normalize(json.$path), Path.normalize(path) );
        assert.ok( json.$modified );
        assert.ok( json.$json);
        assert.ok( json.$json.isReady );


        done();
    });


    it( "load( path to json ) - json is in proccess directory.", function (done) {

        // no path passed, use in process.
        var lib = require('../lib');
        var path = './test-in-process.json';
        var json = lib.json( path );

        assert.ok(json);

        var Path = require( 'path' );
        assert.equal( Path.resolve(json.$path), Path.resolve(path) );
        assert.ok( json.$modified );
        assert.ok( json.$json);
        assert.ok( json.$json.isReady );


        done();
    });

    it( "load(path to json) - relative path", function (done) {

        var lib = require('../lib');
        var path = './test.json';
        var json = lib.json( path );

        assert.ok(json);
        assert.ok( json.$modified );
        assert.ok( json.$json);
        assert.ok( json.$json.isReady );


        done();
    });

});