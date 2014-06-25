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
    var fs = require( 'fs' );

    if( !template || !_.isString(template) ) {
        console.log("[## ERROR] wrong argument 'template'. Is not a string." );
        return;
    }

    var S = require( 'string' );

    function loadTmpl(template) {
       return fs.readFileSync(template);
    }



    return streams.through(

        function write(data) {
            var tmpl = S(template).startsWith( "file://" ) ? loadTmpl(template) : template;
            var rendered = _.template(tmpl, data);

            if( !field ) {
                console.log(" --- has no field param: " + field);

                this.emit('data', rendered );
                return;
            }

            if(_.isString(field) && _.has(data, field) ) {
                console.log( "[## WARN] overwrite field data." + field + " with new value. Old value is { value : " + data[field] + "}." );
            }

            data[field] = rendered;

            this.emit('data', data );
        },

        function end () {
            this.emit('end');
        });
};