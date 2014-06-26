exports.exec = function( ) {
    var streams = require('event-stream');

    return streams.through(function write(data) {
            console.log( "-- exec split(data)" );

            var _ = require( 'underscore' );
            if(!_.isArray( data ) ) {
               console.log( "-- skip split(data). data is NOT AN ARRAY. Pass data to next transformation" );
               return data;
            }

            var stream = this;
            _.each(data, function( element ){
                stream.emit('data', element );
                console.log( "-- element emitted: %j", element);
            });
        },

        function end () {
            this.emit('end');
        });
};