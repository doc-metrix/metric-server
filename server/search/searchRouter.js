'use strict';

var searchCtrl = require( './searchController' );

module.exports = function( router ) {

	// Sets the logic that will be executed each time a request is made to this router.
	router.use( function( req, res, next ) {

		// Logs to console the request URL, path, and method.
		console.log( 'Req URL:', req.url, '\nReq path:', req.path, '\nReq method:', req.method );

		next();
	} );

	// Sets the GET endpoint for querying a metric by its name
	router.route( '/' )
	    .get( function( req, res ) {

	    	// Sends the client an informative message if they do not include any parameters in the url request
	    	if (!req.query.metric) {
	    		res.send( 'Did you include the query parameter \'metric\' in the url request? For example, \'http://127.0.0.1:3030/?metric=mem.utilization\' to search for the \'mem.utilization\' metric.' );
	    		return;
	    	}

	    	searchCtrl.matchStr( req.query.metric, function( err, matches ) {
	    		if (err) {
	    			res.send( err );
	    			return;
	    		}
	    		res.send( matches );
	    	} );
	    } );
};
