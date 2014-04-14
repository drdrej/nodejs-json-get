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

        return {
            transform : function( fnc ) {
                console.log( "[## SKIP] transform() for query: " + inputQuery );

                return {
                    insert : function( outputQuery ) {
                        console.log( "[## SKIP] () for query: " + outputQuery);
                    }
                }
            }
        }
    }
};

exports.query =  function (json) {
    var _ = require('underscore');
    var isObject = require('./asserts/isObject').check;

    if( !isObject(json, "Couldn't query an object-structure.") ) {
        console.error( "JSON ::: %j", json );
        return DEFAULT_NOOP_QUERY;
    }

    var  streams = require( 'event-stream' );

    return {
        json: json,

        select: function (path) {
            var selectable = require( './io/select.js').select;
            streams.pipe(selectable(json, path));

            return this;
        },

        transform: function( fnc ) {
            var transformator = require( './io/transform.js').transform;
            streams.pipe(transformator(fnc));

            return this;
        },

        finished: function( done ) {
            var finished = require( './io/finished.js').finished;
            streams.pipe( finished(done) );
        },

        dump: function( pathTmpl ) {

        }
    };
};
