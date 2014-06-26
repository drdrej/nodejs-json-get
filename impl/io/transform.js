var use = function(transformFnc) {
    var _ = require( 'underscore' );

    if(_.isFunction(transformFnc) ) {
        return transformFnc;
    } else if(_.isString(transformFnc) ) {
        console.log( "-- load transformation: " + transformFnc);

        return require( transformFnc ).transform;
    } else {
        throw "ERROR: don't accept param:transformFnc";
    }
};

exports.exec = function( transformFnc ) {
    var streams = require('event-stream');

    var fnc = use(transformFnc);

    return streams.through(function write(data) {
            console.log( "use transformation" );

            var exec = require( '../asserts/exec.js').exec;
            var result = exec( fnc, data );

            this.emit('data', result);
        },

        function end () { //optional
            this.emit('end');
        });
};