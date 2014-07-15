/**
 * if passed value is function, returns it, nothing will be loaded.
 * if passed value is a string tries to load function.
 *
 * @param fnc
 * @return {*}
 */
exports.load = function(fnc) {
    var _ = require( 'underscore' );

    if(_.isFunction(fnc) ) {
        return fnc;
    } else if(_.isString(fnc) ) {
        console.log( "-- load transformation: %j", fnc);

        var isFilePath = require( '../asserts/isFilePath').check;
        var foundPath = isFilePath(fnc);
        if( foundPath ) {
            var pathUtil = require( 'path' );
            var resolved = pathUtil.resolve(pathUtil.normalize( foundPath ));
            return require(resolved).transform;
        }

        return require( fnc ).transform;
    } else {
        console.log( ("[ERROR] couldn't use function: " + fnc).red );
        throw "ERROR: don't accept param:transformFnc";
    }
};