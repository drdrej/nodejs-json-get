/**
 * creates a wrapper to work with complex json-structures.
 *
 * @param object
 * @author A. Siebert, ask@touchableheroes.com
 */


var Pipe = require( './Pipe.js').Pipe;
var _ = require('underscore');


exports.query =  function (json, options) {
    if(!json) {
        // throw "PASSED OBJECT is NULL! Skip pipe.";
        return new Pipe(null, options);
    }

    var factory = require( "./Pipe.js");
    var stream = factory.createPipe( json );

    return new Pipe(stream, options);
};
