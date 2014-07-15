exports.check = function( path ) {
    var S = require( 'string' );
    var str = S( path );

    if( str.startsWith( "file://" ) ) {
        var realPath = path.substr( "file://".length );

        console.log( "isFilePath: " + realPath );
        return realPath;
    }

    return null;
};