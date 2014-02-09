/**
 * concatenate  values
 *
 * @param value simple value or array of values. will be
 * converted to a simple text-string of text values.
 *
 * @returns {string}
 *
 * @author A. Siebert, ask@touchableheroes.com
 */
exports.asText = function (value, options) {
    var _ = require('underscore');

    if (!value && value != false) {
        return options.defaultVal;
    }

    if (_.isString(value)) {
        return value;
    }

    if (_.isArray(value)) {
        var rval = "";

        _.each(value, function (entry) {
            rval += entry ? entry : "";
        });

        return rval;
    }

    console.log("-- couldn't convert value to string: %j", value);
    return options.defaultVal;
};