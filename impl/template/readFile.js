

exports.read = function( path ) {
    var pathUtil = require( 'path' );
    var realPath = pathUtil.normalize( pathUtil.resolve(path) );

    var dir = pathUtil.dirname( realPath );

    var fs = require( 'fs' );
    if( !fs.existsSync(dir) ) {
        console.log( "[## INFO] path not exists: " + dir + ". couldn't read template! " );
        return null;
    }

    return fs.readFileSync(realPath, 'utf-8');
}