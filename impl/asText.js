/**
 * concatenate  values
 *
 * @param value simple value or array of values. will be
 * converted to a simple text-string of text values.
 *
 * @param options
 *
 * @returns {string}  trimmed string, defaultValue or undefined.
 *
 * @author A. Siebert, ask@touchableheroes.com
 */
exports.asText = function (value, options) {
    var _ = require('underscore');
    var conf = options;

    var trimmed = function( value, options ) {
        if( options && options.trim ) {
            var S = require( "string" );
            return S(value).trim();
        }

        return value;
    };

    if (!value && value != false) {
        return options.defaultVal;
    }

    if (_.isString(value)) {
        return trimmed(value, options);
    }

    if (_.isArray(value)) {
        var rval = "";

        _.each(value, function (entry) {
            rval += entry ? entry : "";
        });

        return trimmed(rval, options);
    }

    console.log("-- couldn't convert value to string: %j", value);
    if (options && options.defaultVal)
        return options.defaultVal;

    return;
};