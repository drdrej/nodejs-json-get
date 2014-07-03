/**
 * dump a json element to file.
 * forward this element in stream pipeline.
 *
 * example:
 * dump( "c:\temp\dump<%= name %>.txt" )
 * dump( "c:\temp\dump<%= element.text()  %>.txt" )
 *
 * @param path should be an absolute path or path-template.
 * @returns {*}
 */
exports.exec = function( path, options ) {
    var _ = require( 'underscore' );
    var streams = require('event-stream');
    var fs = require( 'fs' );


    return streams.through(
        function write(data) {
            var rendered = JSON.stringify(data, null, 4);

            var write = require( './helper/handleDataWriting').write;
            write(this, path, data, rendered);
        },

        function end () {
            this.emit('end');
        });
};


