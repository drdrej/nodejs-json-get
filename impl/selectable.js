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
            var select = require('JSONSelect');
            var selected = select.match(path, this.json);
            var concat = require("../api.js").asText;

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
