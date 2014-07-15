var assert = require("assert");
var _ = require("underscore");

describe('Test load function', function () {

    it( "load(fnc) - absolute path exists", function (done) {
        var lib = require('../lib');
        var testFnc = function(){};

        var loaded = lib.fnc( testFnc );
        assert.ok(loaded);
        assert.equal( testFnc +"", loaded +"");

        done();
    });

    it( "load(relative-path) - file exists in caller dir", function (done) {
        var lib = require('../lib');

        var loaded = lib.fnc( './external_fnc.js' );

        assert.ok(loaded);
        assert.ok(_.isObject(loaded) );
        assert.ok(_.isFunction(loaded.test) );

        done();
    });

    it( "load(relative-path, strategy) - file exists in caller dir, passing strategy", function (done) {
        var lib = require('../lib');

        var loaded = lib.fnc( './external_fnc.js', function(path) {
            var imported = require(path);
            return imported.test;
        });

        assert.ok(loaded);
        assert.ok(_.isFunction(loaded) );

        done();
    });

    it( "load(file://absolute-path, strategy) - file exists in caller dir, passing strategy", function (done) {
        var lib = require('../lib');

        var loaded = lib.fnc( 'file://' + __dirname +  '/./external_fnc.js', function(path) {
            var imported = require(path);
            return imported.test;
        });

        assert.ok(loaded);
        assert.ok(_.isFunction(loaded) );

        done();
    });

});