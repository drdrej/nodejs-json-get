exports.exec = function( operation ) {
    var streams = require('event-stream');
    var _ = require( 'underscore' );

    if( !operation || !_.isFunction(operation) ) {
        console.log( ("[ERROR] no operation passed. op: %j"), operation);
        console.log( "[ERROR] operation invalid".red);

        throw new Error( "Need an operation ...");
    }

    return streams.through(function write(data) {
            var stream = this;
            operation.exec(data, function(err) {
                console.log( "[OPERATION] finished" );

                stream.emit( 'data', data );
                return;
            });
        },

        function end () {
            this.emit('end');
        });
};