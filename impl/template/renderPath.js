
exports.render = function( path, data ) {
    var _ = require( 'underscore' );
    var rendered = _.template(path, data);

    var isFilePath = require( '../asserts/isFilePath.js').check;
    var foundPath = isFilePath( rendered );

    if( foundPath ) {
        var pathUtil = require( 'path' );
        var resolved = pathUtil.resolve( pathUtil.normalize( foundPath ) );

        return resolved;
    }

    console.log( "[WARN] output is not a path. path = " + path );
};