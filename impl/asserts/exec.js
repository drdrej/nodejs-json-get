

exports.exec = function( fnc, param1, param2, param3, param4, param5, param6 ) {
    var _ = require('underscore');

    if (!(fnc && _.isFunction(fnc))) {
        console.error("[## ERROR] couldn't exec function: " + fnc);
        return;
    }

    return fnc( param1, param2, param3, param4, param5, param6);

    /*
    if (!params1) {
        return fnc();
    } else {
        return fnc( param1, param2, param3, param4, param5, param6);
    }
    */
};

/*

 TODO: evtl. behandlung für arrays einbauen ...
 else if(_.isArray(params) ) {
 return fnc(params);


 for(i = 0; i <= params.length; i++) {

 }

 */
