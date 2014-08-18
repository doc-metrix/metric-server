'use strict';

var fs = require( 'fs' ),
	path = require( 'path' ),

	// Reads the metric files and stores them in memory as objects for faster access.
	metrics = {
		'disk': JSON.parse( fs.readFileSync( path.normalize( __dirname + '/../../metrics/disk.json' ), 'utf8' ) ),
		'load': JSON.parse( fs.readFileSync( path.normalize( __dirname + '/../../metrics/load.json' ), 'utf8' ) ),
		'mem': JSON.parse( fs.readFileSync( path.normalize( __dirname + '/../../metrics/memory.json' ), 'utf8' ) ),
		'sensors': JSON.parse( fs.readFileSync( path.normalize( __dirname + '/../../metrics/sensor.json' ), 'utf8' ) ),
		'uptime': JSON.parse( fs.readFileSync( path.normalize( __dirname + '/../../metrics/uptime.json' ), 'utf8' ) ),
	};

module.exports = {

	/**
	* FUNCTION: matchStr( metricName, clbk )
	*   Given an input string, creates a list of all metrics that the input string matched, with respects to the variant field (this values is a regular expression) of the metrics. The callback argument is invoke with this list or null if no metrics were found.
	*
	* @param {String} metricName - name of the metric
	* @param {Function} clbk - callback function
	*/	
	matchStr: function( metricName, clbk ) {
		var matches = [],

			// Creates a reference to the metric category that is given in the first period seperated segment of the metricName.
			metricsObj = metrics[ metricName.split( '.' )[ 0 ] ],

			key,
			regularExpr;

		// Checks if metricName is of type string.
		if ( typeof metricName !== 'string' ) {
			clbk( 'Error: The metric name must be a String' );
		}

		// Checks if the first period seperated segment of the metric name matches any of the metric classifications.
		if ( !metricsObj ) {
			clbk( 'Error: The first segment of the metric name is not an expected metric classification.' );
		}

		for ( key in metricsObj ) {
			regularExpr = metricsObj[ key ][ 'variants' ];

			// First check if the metric name matches the regular expression in the variant field of the metric, if it is not null. If the variant field is null, check if the metric name is equivalent to the key of the metic.
			if ( regularExpr ) {
				if ( metricName.match( regularExpr ) ) {
					matches.push( metricsObj[ key ] );
				}
			} else if ( metricName === key ) {
				matches.push( metricsObj[ key ] );
			}
		}

		// If metrics matching the metric name were found, invoke the callback function with the list of matches, otherwise invoke the callback with 'No Metrics Found'.
		if ( matches.length ) {
			clbk( null, matches );
		} else {
			clbk( null, 'No Metrics Found' );
		}
	} // end FUNCTION matchStr()
};
