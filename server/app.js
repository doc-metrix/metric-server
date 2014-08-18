'use strict';

var express = require( 'express' ),
	app = express(),

	// Creates a router object for encapsulating additional routers as needed
	routers = {
		searchRouter: express.Router()
	};

// Configures the app object (eg. to use middleware, etc.)
require( './config' )( app, routers );

// Configures the routers (eg. defines paths and action verbs)
require( './search/searchRouter' )( routers.searchRouter );

module.exports = app;
