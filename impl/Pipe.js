var Pipe = function(stream, options) {
    this.start = stream;

    this.current = stream;
    this.options = options;
};

Pipe.prototype._use = function( stream) {
    this.current.pipe( stream );
    this.current = stream;
};

Pipe.prototype.select = function( path ) {
    var selectable = require( './io/selectV2.js').exec;
    this._use(selectable(path));

    return this;
};

Pipe.prototype.render = function( template, field ) {
    var render = require( './io/renderV3.js').exec;
    this._use( render( template, field ) );

    return this;
};

Pipe.prototype.dump = function( path ) {
    var dump = require( './io/dumpV2.js').exec;
    this._use( dump(path, this.options) );

    return this;
};

Pipe.prototype.transform = function( fnc ) {
    var transformator = require( './io/transform.js').exec;
    this._use(transformator(fnc, this.options));

    return this;
};

Pipe.prototype.validate = function( validateFnc, skipIfBroken ) {
    var fnc = require( './io/validate.js').exec;
    this._use( fnc(validateFnc, skipIfBroken, this.options) );

    return this;
};

Pipe.prototype.asArray = function() {
    var fnc = require( './io/asArray.js').exec;
    this._use( fnc() );

    return this;
};

Pipe.prototype.asSelectable = function() {
    var fnc = require( './io/asSelectable.js').exec;
    this._use( fnc() );

    return this;
};

Pipe.prototype.split = function( ) {
    var fnc = require( './io/split.js').exec;
    this._use( fnc() );

    return this;
};

/**
 * @param fnc
 */
Pipe.prototype.done = function( fnc ) {
    var finished = require( './io/finished.js').exec;
    this._use( finished(fnc) );

    this.current = null;
};


/**
 * @Deprecated
 *
 * @param fnc
 */
Pipe.prototype.finished = Pipe.prototype.done;


exports.Pipe = Pipe;