/**
 * API to access this lib.
 *
 * @returns {string}
 *
 * @author A. Siebert, ask@touchableheroes.com
 */


exports.asText = require( './impl/asText.js').asText;

exports.selectable = require( './impl/selectable.js').selectable;

/**
 * Use query-api to perform transforms and other operations.
 *
 * query( json ).select( '.path1', '.path2', '.path3' ).transform( function(p1, p2, p3) ).insert( '.path' )
 *
 * @type {query}
 */
exports.query = require( './impl/pipe.js' ).query;


