/**
 *
 * @param done function
 * @returns {*}
 */
exports.finished = function( done ) {
    var streams = require('event-stream');

    return streams.through(function write(data) {
            this.emit('data', data );
        },
        function end () {
            var exec = require( '../asserts/exec.js').exec;
            exec( done );

            this.emit('end');
        });
};