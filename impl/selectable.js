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
        var msg = "## couldn't create a selectable. json = " + json;
        console.error(msg);
        throw msg;
    }

    return {
        json: json,

        text: function (path) {
            var select = require('JSONSelect');
            var selected = select.match(path, this.json);
            var concat = require("../api.js").asText;

            return concat(selected);
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
                  step(entry, idx);
            });
        }
    }
};
