var _ = require( 'underscore' );

var Selectable = require( './Selectable').Selectable;

/**
 * creates a wrapper to access json elements over css-query.
 *
 * @param object
 * @author A. Siebert, ask@touchableheroes.com
 */
exports.selectable =  function (json) {
    if(!json || _.isNull(json))
       return  new Selectable(null);

    if( json.$isSelectable )
        return json;

    return new Selectable(json);
};
