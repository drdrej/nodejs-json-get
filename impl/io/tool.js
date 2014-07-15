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

    return streams.through(function write(data) {
            console.log( "[TOOL] exec: " + operation );

            var stream = this;

            var exec = require( '../asserts/exec.js').exec;
            exec( fnc, data, function(err) {
                console.log( "[OPERATION] finished" );

                stream.emit( 'data', data );
                return;
            });
        },

        function end () {
            this.emit('end');
        });
};