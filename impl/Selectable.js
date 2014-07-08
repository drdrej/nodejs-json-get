var _ = require( 'underscore' );
var match =  require( "./query/match").match;

var Selectable = function(json) {
    this.$isSelectable = true;
    this.json = json;
}

Selectable.prototype.text = function (path, defVal, shouldTrim) {
    console.log( "-- text( path : %j )", path);

    var concat = require("../api.js").asText;
    var selected = match(path, this.json); // (path, obj)

    if( defVal ) {
        return concat(selected, {
            defaultVal: defVal,
            trim: shouldTrim
        });
    } else {
        return concat(selected);
    }
};

Selectable.prototype.put = function (key, value) {
    var _ = require("underscore");

    var S = require( 'string' );
    if( S(key).startsWith("#") ) {
        var field = key.substr(1);

        console.log("[PUT] %j : %j", field, value);
        this.json[field] = value;
    }
};

Selectable.prototype.exists = function (path) {
    var selected = match(path, this.json);
    return (selected && selected.length && selected.length > 0);
};

Selectable.prototype.first = function (path) {
    var selected = match(path, this.json);

    var hasFirstValue = (selected && selected.length && selected.length > 0);
    if(  hasFirstValue ) {
        return selected[0];
    }

    return;
},

Selectable.prototype.each = function (path, step) {
        if( !( step && _.isFunction(step) )) {
            console.error( "## couldn't seleact each, because no callback passed.");
            return;
        }

        var selected = match(path, this.json);

        _.each( selected, function (entry, idx){
            var factory = require( './SelectableFactory' );
            var wrapped = factory.selectable(entry);

            step(wrapped, idx);
        });
    };

Selectable.prototype.render = function( template ) {
    var render = require( './template/renderTmpl.js').render;
    return render( template, this);
};

/**
 * render as list as string.
 * use passed delimiter.
 *
 * if
 *
 * @param path
 * @param template
 * @param delim
 */
Selectable.prototype.list = function (path, template, delim) {
    var selected = null;

    if( !path ) {
        selected = [this.json];
    } else {
        selected = match(path, this.json);
    }

    if( !delim ) {
        delim = ", ";
    }

    var render = null;
    if( template ) {
        render = require('./template/renderTmpl.js').render;
    }

    var rendered = "";
    _.each( selected, function (entry, idx){
        var factory = require( './SelectableFactory' );
        var wrapped = factory.selectable(entry);

        if( idx > 0 ) {
            rendered += delim;
        }

        if( render && _.isFunction(render) )
            rendered += render( template, wrapped );
        else
            rendered += wrapped.text();
    });

    return rendered;
};

exports.Selectable = Selectable;

