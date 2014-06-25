exports.check = function( obj ) {
   var _ = require( "underscore" );
   return (_.isBoolean( obj ) && obj);
};