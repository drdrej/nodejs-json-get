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

exports.exec = function( transformFnc, skipIfInvalid, options ) {
    var streams = require('event-stream');

    var fnc = use(transformFnc);

    return streams.through(function write(data) {
            console.log( "[VALIDATE] use validator: " + transformFnc );

            var exec = require( '../asserts/exec.js').exec;
            var result = exec( fnc, data, options );

            var isTrue = require( "../asserts/isTrue.js").check;

            console.log( "[VALIDATED] result = " + result);

            if( isTrue(result) ) {
                this.emit('data', data);
                return;
            }

            if( isTrue(skipIfInvalid) ) {
                console.log( "-- [INVALID] element is invalid, skip element." );
                return;
            }

            console.log( "[INVALID] couldn't exec, because error in stream.");
            console.log( "[INVALID] data: %j", data);

            throw new Error( "Couldn't exec validation successful. Use 'skipIfInvalid'=true Param to ignore invalid elements." );
        },

        function end () { //optional
            this.emit('end');
        });
};