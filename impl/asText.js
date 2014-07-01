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
    return concat(value, options);
};


var trimmed = function( str, options ) {
    if( options && options.trim ) {
        var S = require( "string" );
        return S(str).trim();
    }

    return str;
};

var concatArray = function( array, options ) {
    var _ = require('underscore');

    var rval = "";
    _.each(array, function (entry) {
        rval += concat(entry, options);
    });

    return trimmed(rval, options);
};

var concatObj = function( obj, options ) {
    var _ = require( 'underscore' );
    var values = _.values( obj );

    var rval = "";
    _.each( values, function( element ) {
        rval += concat(element, options);
    });

    return rval;
};


var concat = function( value, options ) {
    var _ = require('underscore');

    if (_.isString(value))
        return trimmed(value, options);

    if (_.isArray(value))
        return concatArray(value, options);

    if(_.isObject(value) )
        return concatObj(value, options);

    if ( !value && options && _.has(options, "defaultVal") )
       return concat(options.defaultVal);

    return "" + value;
};

