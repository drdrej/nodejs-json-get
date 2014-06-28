/**
 *
 * @param done function
 * @param options object
 *
 * @returns {*}
 */
exports.exec = function( done, options ) {
    var streams = require('event-stream');

    return streams.through(function write(data) {
            this.emit('data', data );
        },

        function end () {
            var exec = require( '../asserts/exec.js').exec;
            exec( done, options );

            this.emit('end');
        });
};