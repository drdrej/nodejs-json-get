

var prepareTemplate = function( template, data ) {
    var _ = require( 'underscore' );

    if( !template || !_.isString(template) ) {
        console.log("[## ERROR] wrong argument 'template'. Is not a string." );
        return;
    }

    var isFilePath = require( '../asserts/isFilePath').check;
    var path = isFilePath(template);
    if( path ) {
        var read = require( './readFile' ).read;
        return read( path, data );
    }

    return template;
};


/**
 *
 * @param path {String} path or template. path need to start with file://
 * @param obj
 *
 * @return rendered string or NULL.
 */
exports.render = function( template, data ) {
    var _ = require( 'underscore' );

    var tmpl = prepareTemplate(template, data);
    var rendered = _.template(tmpl, data);

    return rendered;
};
