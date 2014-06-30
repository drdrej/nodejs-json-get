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

var _ = require('underscore');


var createStream = function( json ) {
    var  streams = require( 'event-stream' );
    var isObject = require('./asserts/isObject').check;

    if( isObject(json, "Couldn't query an object-structure.") ) {
        return streams.readArray( [json] );
    }

    if( _.isArray(json) ) {
        return streams.readArray( json );
    }

    throw "UNSUPPORTED TYPE OF OBJECT: " + json;

};

exports.query =  function (json, options) {
    if(_.isNull(json) ) {
        throw "PASSED OBJECT is NULL! Skip pipe.";
    }

    var stream = createStream( json );

    return new Pipe(stream, options);
};
