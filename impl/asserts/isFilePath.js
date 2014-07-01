exports.check = function( path ) {
    var S = require( 'string' );
    var str = S( path );

    // return ( str.startsWith( "file://" ) ) ? path.substr( "file://".length ) : null;

    if( str.startsWith( "file://" ) ) {
        var realPath = path.substr( "file://".length );

        console.log( "isFilePath: " + realPath );
        return realPath;
    }



    return null;
};