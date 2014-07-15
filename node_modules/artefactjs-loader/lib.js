var fs = require('fs');
require( 'colors' );

var use = function( type, path, strategy ) {
    var load = require( './loader/' + type).load;
    var loader = require( './loader/loader').loader;

    return loader(path, load, strategy);
};

/**
 * load path.
 *
 * @param path
 */
exports.json = function( path, strategy ) {
    if( !strategy ) {
        strategy = function (path) {
            return require(path);
        };
    }

    return use( 'json', path, strategy );
};

exports.fnc = function( path, strategy ) {

    if( !strategy ) {
        strategy = function (path) {
            return require(path);
        };
    }

    return use( 'fnc', path, strategy);
};


