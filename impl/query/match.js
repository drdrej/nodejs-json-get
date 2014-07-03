
exports.match = function(path, obj) {
    var _ = require( 'underscore' );
    var isValidArguments = (path && _.isString(path) && !_.isNull(obj));

    if( isValidArguments ) {
        var S = require( "string" );
        var str = S(path).trim();
        var isID =  str.startsWith( '#');

        if( isID ) {
            var id = str.s.substr(1);
            var value = obj[id];

            console.log( "-- select by ID: " + id + " value = " + value);

            return value;
        }

        var select = require('JSONSelect');
        return select.match(path, obj);
    }

    if( !path || !_.isString(path) ) {
        console.log( "-- no path passed." );

        if (_.isArray(obj))
            return obj;

        if( !_.isNull(obj) ) {
            return [obj];
        }
    }


    return null;
};


