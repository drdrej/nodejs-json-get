require( 'colors' );


var load = function( path ) {
    var loader = require( 'artefactjs-loader');

    return loader.fnc( path,
        function(path) {
            return require(path).exec;
        });
};

exports.exec = function( operation, options ) {
    var streams = require('event-stream');

    var fnc = load(operation);
    var execCounter = 0; // start with one, because of 'end' package

    return streams.through(function write(data) {
            console.log( "[TOOL] exec: " + operation );

            execCounter++;

            var stream = this;
            console.log( '[stream stoped]');
            stream.pause();

            fnc(data, function(err) {
                console.log( "[OPERATION] finished" );

                if( err ) {
                    console.log( "[ERROR] skip operation".red );
                    execCounter--;

                    return;
                }

                setTimeout( function() {
                    stream.emit( 'data', data );
                    console.log( "-- pic should be saved. next event.");
                    execCounter--;
                }, 1000);

                return;
            });
        },

        function end () {
            var _ = require( 'underscore' );
            var stream = this;

            var wait = setInterval( function() {
                console.log( "-- check is ready? " + execCounter );

                if( !(execCounter > 0) ) {
                    stream.resume();

                    clearInterval(wait);
                    stream.emit('end');

                    return;
                }
            }, 1000);

        });
};