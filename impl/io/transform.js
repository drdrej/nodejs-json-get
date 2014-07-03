var use = function(transformFnc) {
    var _ = require( 'underscore' );

    if(_.isFunction(transformFnc) ) {
        return transformFnc;
    } else if(_.isString(transformFnc) ) {
        console.log( "-- load transformation: %j", transformFnc);

        var isFilePath = require( '../asserts/isFilePath').check;
        var foundPath = isFilePath(transformFnc);
        if( foundPath ) {
            var pathUtil = require( 'path' );
            var resolved = pathUtil.resolve(pathUtil.normalize( foundPath ));
            return require(resolved).transform;
        }

        return require( transformFnc ).transform;
    } else {
        throw "ERROR: don't accept param:transformFnc";
    }
};

exports.exec = function( transformFnc, options ) {
    var streams = require('event-stream');

    var fnc = use(transformFnc);

    return streams.through(function write(data) {
            console.log( "use transformation" );

            var exec = require( '../asserts/exec.js').exec;
            var result = exec( fnc, data, options );

            this.emit('data', result);
        },

        function end () { //optional
            this.emit('end');
        });
};