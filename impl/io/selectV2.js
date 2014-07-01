/**
 * create a stream of objects from json, based on JSONSelect.
 *
 * @param object
 * @author A. Siebert, ask@touchableheroes.com
 */


/**
 * this function select sub-structures on passed object.
 *
 * @param path CSS path (see: JSONSelect)
 */
exports.exec = function( path ) {
    var jsonSelect = require( 'JSONSelect' );

    var streams = require('event-stream');
    var _ = require( 'underscore' );

    return streams.through(function write(data) {
            var selected = jsonSelect.match(path, data);

            if( !selected ) {
                console.log( "[WARN] nothing found in path: %j ", path );
                return;
            }

            var pipe = this;

            _.each( selected, function( element ) {
                pipe.emit('data', element );
            });
        },

        function end () { //optional
            this.emit('end');
        });
};