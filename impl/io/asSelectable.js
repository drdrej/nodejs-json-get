exports.exec = function( ) {
    var streams = require('event-stream');
    var api = require('../../api.js');

    return streams.through(function write(data) {
            var result = api.selectable(data);
            this.emit('data', result);
        },

        function end () {
            this.emit('end');
        });
};
