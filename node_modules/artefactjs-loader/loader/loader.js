var fs = require('fs');
require( 'colors' );

var loadInProcess = function( path, load, strategy ) {
    var Path = require( 'path' );

    console.log( "-- in caller-path not exists, try in process..." );
    var inProcess = Path.resolve( process.cwd(), path);

    if( fs.existsSync(inProcess) ) {
        return load( inProcess, strategy );
    }
};

var loadInCaller = function(path, load, strategy) {
    var callsite = require('callsite');

    var stack = callsite();
    var callerFile = stack[4].getFileName();

    var Path = require( 'path' );
    var callerDir = Path.dirname( callerFile );
    var resolved = Path.resolve(callerDir, path);

    console.log( "-- use caller-file to resolve json-path." );
    console.log( " try: " + resolved );

    if( fs.existsSync(resolved) ) {
        return load(resolved, strategy);
    }
};

exports.loader = function( path, load, strategy ) {
    var _ = require('underscore');

    if( !_.isString(path) ) {
        console.log( "[WARN] passed var path is not of type String.".yellow );
        console.log( path );
        console.log( "-- use it as it is." );
        return path;
    };

    var S = require('string');
    var str = S(path);

    if (!str.endsWith('.json') && !str.endsWith('.js') ) {
        console.log("[ERROR] couldn't load path. path should ends with '.json' or '.js'.".red);
        console.log("-- passed path:  " + path);

        return;
    }

    if( str.startsWith('file://') ) {
        path = path.substr( "file://".length );
    }

    if (!fs.existsSync(path)) {
        console.log("-- path not exists. path : " + path);
        console.log("-- try to resolve... ");

        var loaded = loadInProcess(path, load, strategy);
        if (loaded)
            return loaded;

        loaded = loadInCaller(path, load, strategy);
        if (loaded)
            return loaded;

        console.log("[ERROR] couldn't resolve file: " + path);
        return;
    } else {
        console.log("-- file exists: " + path);
        return loadInProcess(path, load, strategy);
    }

    return load(path, strategy);
};


