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

    return {
        json: json,

        first: function (path) {
            var select = require('JSONSelect');
            var selected = select.match(path, this.json);

            var hasFirstValue = (selected && selected.length && selected.length > 0);
            if(  hasFirstValue ) {
                return selected[0];
            }

            return;
        }

    };
};
