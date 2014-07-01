exports.check = function( path ) {
    var S = require( 'string' );
    var str = S( path );

    return ( str.startsWith( "file://" ) ) ? path.substr( "file://".length ) : null;
};