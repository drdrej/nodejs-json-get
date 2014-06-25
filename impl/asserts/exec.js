

exports.exec = function( fnc, params ) {
    var _ = require('underscore');

    if (!(fnc && _.isFunction(fnc))) {
        console.error("[## ERROR] couldn't exec function: " + fnc);
        return;
    }

    if (!params) {
        return fnc();
    } else {
        return fnc( params );
    }
};

/*

 TODO: evtl. behandlung für arrays einbauen ...
 else if(_.isArray(params) ) {
 return fnc(params);


 for(i = 0; i <= params.length; i++) {

 }

 */
