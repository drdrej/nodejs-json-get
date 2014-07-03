
exports.write = function( path, content ) {
    var pathUtil = require( 'path' );
    var realPath = pathUtil.resolve( path );

    var dir = pathUtil.dirname( realPath );

    var fs = require( 'fs' );
    if( !fs.existsSync(dir) ) {
        console.log( "[## INFO] path not exists. creates path: " + dir );
        var wrench = require( 'wrench' );
        wrench.mkdirSyncRecursive(dir, 0777);
    }

    return fs.writeFileSync(realPath, content);
};

