/**
 * render content, based on selected json sub-structure
 * and passed template.
 *
 * basic impl. uses underscore template implementation.
 *
 * example:
 * --------
 * render( "c:\temp\my-template.txt.tmpl" )
 *
 * creates a rendered text based on template and json-data.
 * stream will pass rendered content to next stream handler.
 *
 * render( "c:\temp\my-template.txt.tmpl", "$rendered" )
 *
 * creates a rendered text based on template and json-data
 * and put the rendered result into the passed object.
 * later you can use this value, to access rendered content.
 *
 * in the above example render writes rendered content into the object-field "$rendered".
 *
 *
 * @param path should be an absolute path or path-template.
 * @param field [optional] if string -> passed field name to store rendered result.
 *
 * @returns {*} stream to render
 */
exports.exec = function( template, field ) {
    var _ = require( 'underscore' );
    var streams = require('event-stream');


    return streams.through(

        function write(data) {
            var render = require('../template/renderTmpl.js').render;
            var rendered = render(template, data);

            var write = require( './helper/handleDataWriting' ).write;
            write(this, field, data, rendered );
        },

        function end () {
            this.emit('end');
        });
};


