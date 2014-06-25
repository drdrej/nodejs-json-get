exports.exec = function( ) {
    var streams = require('event-stream');

    var merged = [];

    return streams.through(function write(data) {
            console.log( ".. merge stream" );
            merged.push( data );
        },

        function end () {
                this.emit('data', merged );
                this.emit('end');
        });
};