
var load = function( path ) {
    var loader = require( 'artefactjs-loader');

    return loader.fnc( path,
       function(path) {
         return require(path).transform;
   });
};

exports.exec = function( transformFnc, options ) {
    var streams = require('event-stream');

    var fnc = load(transformFnc);

    return streams.through(function write(data) {
            console.log( "[TRANSFORMATION] exec: " + transformFnc );

            var exec = require( '../asserts/exec.js').exec;
            var result = exec( fnc, data, options );

            this.emit('data', result);
        },

        function end () { //optional
            this.emit('end');
        });
};