exports.transform = function( transformFnc ) {
    var streams = require('event-stream');

    return streams.through(function write(data) {
            // this.pause();
            console.log( "use transformation" );

            var exec = require( '../asserts/exec.js').exec;
            var result = exec( transformFnc, data );

            // this.resume();

            this.emit('data', result);
        },

        function end () { //optional
            this.emit('end');
        });
};