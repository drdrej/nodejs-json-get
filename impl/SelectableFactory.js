var _ = require( 'underscore' );

var Selectable = require( './Selectable').Selectable;

/**
 * creates a wrapper to access json elements over css-query.
 *
 * @param object
 * @author A. Siebert, ask@touchableheroes.com
 */
exports.selectable =  function (json) {
    /*
    var _ = require('underscore');
    var isNotObj = !(json && _.isObject(json));

    if (isNotObj) {
        var msg = "## skip! couldn't create a selectable. json = " + json;
        console.error(msg);

        if(_.isString(json) || _.isNumber(json) ) {
            console.log( "-- return json as it is.");
            return json;
        } else {
            console.log( "-- return undefined!");
            return;
        }

        return json;
    }
    */

    return new Selectable(json);
};
