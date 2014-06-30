/**
 * creates a wrapper to work with complex json-structures.
 *
 * @param object
 * @author A. Siebert, ask@touchableheroes.com
 */


/**
 * default empty-query object.
 *
 * @type {{select: select}}
 */
var DEFAULT_NOOP_QUERY = {
    select : function( inputQuery ) {
        console.log( "[## SKIP] query: " + inputQuery);
        return;
    }
};


var Pipe = require( './Pipe.js').Pipe;


exports.query =  function (json, options) {
    var _ = require('underscore');
    var isObject = require('./asserts/isObject').check;

    if( !isObject(json, "Couldn't query an object-structure.") ) {
        console.error( "JSON ::: %j", json );
        return DEFAULT_NOOP_QUERY;
    }

    var  streams = require( 'event-stream' );
    var readObj = streams.readArray( [json] );

    return new Pipe(readObj, options);
};
