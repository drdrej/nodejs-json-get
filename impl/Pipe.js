var Pipe = function(stream, options) {
    this.options = options;

    this._use(stream);

    return this;
};

Pipe.prototype._use = function( stream) {
    if( !stream )
        return;

    if( !this.current) {
        this.start = stream;
        this.current = stream;
    } else {
        this.current.pipe(stream);
        this.current = stream;
    }
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


Pipe.prototype.consume = function( obj ) {
    if( !this.start ) {
        console.log( "ILLEGAL STATE ERROR: couldn't consume, because pipe of streams is not well formed.");
        throw new Error();
    }

    var stream = exports.createPipe(obj);
    var _ = require( 'underscore' );
    if( !stream || _.isNull(stream) ) {
        console.log( "ILLEGAL STATE ERROR: couldn'create stream. maybe passed object is NULL or corrupt.");
        throw new Error();
    }

    stream.pipe(this.start);
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

exports.createPipe = function( json ) {
    var _ = require("underscore");
    var  streams = require( 'event-stream' );
    var isObject = require('./asserts/isObject').check;

    if( isObject(json, "Couldn't query an object-structure.") ) {
        return streams.readArray( [json] );
    }

    if( _.isArray(json) ) {
        return streams.readArray( json );
    }

    throw "UNSUPPORTED TYPE OF OBJECT: " + json;
};