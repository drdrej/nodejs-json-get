require( 'colors' );

exports.exec = function( fnc, param1, param2, param3, param4, param5, param6 ) {
    var _ = require('underscore');

    if (!(fnc && _.isFunction(fnc))) {
        console.error( ("[ERROR] couldn't exec function: " + fnc).red );
        return;
    }

    return fnc( param1, param2, param3, param4, param5, param6);
};