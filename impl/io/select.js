/**
 * create a stream of objects from json, based on JSONSelect.
 *
 * @param object
 * @author A. Siebert, ask@touchableheroes.com
 */


/**
 * this function creates a readable stream of objects by css-selection.
 * @param path CSS path
 */
exports.exec = function( json, path, after ) {
    var streams = require('event-stream');
    var jsonSelect = require( 'JSONSelect' );

    var selected = jsonSelect.match(path, json);

    /*
    var _ = require( 'underscore' );
    var callback = after;

    return streams.readable( function (count, callback) {
            if( count >= selected.length )
                return this.emit('end');

            var data = selected[count];
            this.emit( 'data', data);

            var exec = require( '../asserts/exec.js').exec;
            exec( callback );
        }, true);
    */

    return streams.readArray( selected );
};
