/**
 * creates a wrapper to access json elements over css-query.
 *
 * @param object
 * @author A. Siebert, ask@touchableheroes.com
 */
exports.selectable =  function (json) {
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

    return {
        json: json,

        text: function (path, defVal, shouldTrim) {
            console.log( "-- text( path : %j )", path);

            var concat = require("../api.js").asText;
            var selected = doSelection(path, this.json); // (path, obj)

            if( defVal ) {
                return concat(selected, {
                    defaultVal: defVal,
                    trim: shouldTrim
                });
            } else {
                return concat(selected);
            }
        },

        exists: function (path) {
            var select = require('JSONSelect');
            var selected = select.match(path, this.json);

            return (selected && selected.length && selected.length > 0);
        },

        first: function (path) {
            var select = require('JSONSelect');
            var selected = select.match(path, this.json);

            var hasFirstValue = (selected && selected.length && selected.length > 0);
            if(  hasFirstValue ) {
                return selected[0];
            }

            return;
        },

        each: function (path, step) {
            if( !( step && _.isFunction(step) )) {
                console.error( "## couldn't seleact each, because no callback passed.");
                return;
            }

            var select = require('JSONSelect');
            var selected = select.match(path, this.json);

            _.each( selected, function (entry, idx){
                var wrapped = exports.selectable(entry);
                step(wrapped, idx);
            });
        },

        render: function( template ) {
            var render = require( './template/renderUnderscore.js').render;
            return render( template, this,json);
        }
    }
};

/**
 * Select path on Object or pass it to the next function.
 *
 * @param path
 * @param obj
 * @return {*}
 */
var doSelection = function (path, obj) {
    console.log( '## path [= ' + path+ '] vs. object [= ' + obj + ' ]' );

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

        if (_.isObject(obj))
            return [obj];
    }
}