/**
 * dump a json element to file.
 * forward this element in stream pipeline.
 *
 * example:
 * dump( "c:\temp\dump<%= name %>.txt" )
 *
 * @param path should be an absolute path or path-template.
 * @returns {*}
 */
exports.dump = function( path ) {
    var _ = require( 'underscore' );
    var streams = require('event-stream');
    var fs = require( 'fs' );


    return streams.through(
        function write(data) {
            // dump before forward :::
            var realPath = _.template(path, data);
            var json = JSON.stringify(data, null, 4);

            var pathUtil = require( 'path' );
            var dir = pathUtil.dirname( realPath );
            if( !fs.existsSync(dir) ) {
                console.log( "[## INFO] path not exists. creates path: " + dir );
                var wrench = require( 'wrench' );
                wrench.mkdirSyncRecursive(dir, 0777);
            }

            fs.writeFileSync(realPath, json);

            /*
            , function(err) {
                if(err) {
                    console.log(err);
                    return;
                }

                console.log("[## INFO] JSON saved to: " + realPath);
            }
            */

            this.emit('data', data );
        },

        function end () {
            // forward "end"
            this.emit('end');
        });
};