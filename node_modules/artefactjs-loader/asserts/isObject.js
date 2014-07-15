exports.check =  function (json, msg) {
    var _ = require('underscore');

    var isNotObj = !(json && _.isObject(json));

    if (isNotObj) {
        var msg = "[## SKIP] " + msg + " | json = " + json;
        console.error(msg);

        if (_.isString(json) || _.isNumber(json)) {
            console.log("-- return json as it is.");
            return json;
        } else {
            console.log("-- return undefined!");
            return;
        }

        return json;
    }

    return true;
};