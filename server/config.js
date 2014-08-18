'use strict';

// Configures the app object
module.exports = function( app, routers ) {
	app.set( 'port', process.env.PORT || 3030 );
	app.set( 'base_url', process.env.URL || 'http://127.0.0.1' );
	app.use( '/', routers.searchRouter );
};
