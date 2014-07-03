var _ = require( 'underscore' );
var match =  require( "./query/match").match;

var Selectable = function(json) {
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
    var render = require( './template/renderUnderscore.js').render;
    return render( template, this);
};


exports.Selectable = Selectable;

