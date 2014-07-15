var fs = require('fs');
var colors = require( 'colors' );

/**
 * loads json. use require() to load.
 *
 * if json loaded, returns json wrapped by meta-info about file.
 *
 * @param path
 * @return {{$path: *, $modified: *, $json: *}}
 */
exports.load = function( path, strategy ) {
    var json = null;

    if( !strategy ) {
        strategy = function() {
            console.log("[ERROR] passed param:strategy is undefined. should be a function.");
        };
    }

    try {
        // json = require(path);
        json = strategy(path);
    } catch(err){
        console.log( "[ERROR] couldn't load config. check exception...".red );
        console.log( err );

        return;
    }

    if( !json ) {
        console.log( "[ERROR] couldn't load config. something is wrong...".red );

        return;
    }

    console.log( ("[INFO] json loaded. path = " + path).green);

    var stats = fs.statSync(path);

    return {
        "$path" : path,
        "$modified" :stats.mtime,
        "$json" : json
    };
};