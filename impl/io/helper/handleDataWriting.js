
exports.write = function(stream, path, data, rendered ) {
    if( !path ) {
        console.log(" --- has no field param: " + path + "; pass data ...");
        stream.emit('data', data );

        return;
    }

    var _ = require( 'underscore' );
    if( !_.isString( path ) ) {
        console.log( "[ERROR] passed field-name: " + path + " is not a string." );
        return;
    }

    var renderPath = require( '../../template/renderPath').render;
    var foundPath = renderPath( path, data );
    if( foundPath ) {
        console.log( "-- render path: %j", foundPath );
        var write = require( '../../template/writeFile.js').write;
        write(foundPath, rendered);

        return;
    }

    if(_.has(data, path) ) {
        console.log( "[## WARN] overwrite field data." + path + " with new value. Old value is { value : " + data[ path ] + "}." );
    }

    data[path] = rendered;
    stream.emit('data', data );
};