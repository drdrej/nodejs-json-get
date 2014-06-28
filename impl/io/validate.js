exports.exec = function( validFnc, skipIfInvalid, options ) {
    var streams = require('event-stream');

    return streams.through(function write(data) {
            var exec = require( '../asserts/exec.js').exec;
            var result = exec( validFnc, data );
                //validFnc(data);
                //exec( validFnc, data );

            var isTrue = require( "../asserts/isTrue.js").check;

            console.log( "- -> -- ::: " + result);

            if( isTrue(result) ) {
                this.emit('data', data);
                return;
            }

            if( isTrue(skipIfInvalid) ) {
                console.log( "-- skip element in stream!" );
                return;
            }

            console.log( "-- -- %j", data);

            throw "ERROR: invalid .";
        },

        function end () { //optional
            this.emit('end');
        });
};