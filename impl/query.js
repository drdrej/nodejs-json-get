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
        current: streams,

        use : function( stream ) {
            this.current.pipe( stream );
            this.current = stream;
        },

        select: function (path) {
            var selectable = require( './io/select.js').select;
            this.use(selectable(json, path));

            return this;
        },

        transform: function( fnc ) {
            var transformator = require( './io/transform.js').transform;
            this.use(transformator(fnc));

            return this;
        },

        finished: function( done ) {
            var finished = require( './io/finished.js').finished;
            this.use( finished(done) );

            this.current = null;
        },


        dump: function( path ) {
            var dump = require( './io/dump.js').dump;
            this.use( dump(path) );

            return this;
        }
    };
};
