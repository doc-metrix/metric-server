'use strict';

var app = require( './app' ),
    port = app.get( 'port' );

// Sets the server to listen on the port specified in config.js
app.listen( port );

console.log( 'Listening on ' + app.get( 'base_url' ) + ':' + port );
