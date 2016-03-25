var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var User = new Schema({
	user_id		: String,
	first_name	: String,
	last_name 	: String,
	password	: String,
	profession	: String
});

mongoose.model( 'User', User, "usercollection" );

// Environment variable to set the database
var host = process.env.MONGODB_HOST || "localhost";
var port = process.env.MONGODB_PORT || "27017";
var dbname = process.env.MONGODB_db || "akana_performance";

// Build the connection string
var dbURI = 'mongodb://' + host + ':' + port + '/' + dbname;
// Create the database connection
mongoose.connect( dbURI );

// Connection Events
// When successfully connected
mongoose.connection.on( 'connected', function() {
	console.log( 'Mongoose default connection open to ' + dbURI );

//	mongoose.connection.db.listCollections().toArray(function(err, names) {
//        if (err) {
//            console.log( 'Error doing listCollections(): ' + err );
//        }
//        else {
////            names.forEach(function(e,i,a) {
////                //mongoose.connection.db.dropCollection(e.name);
////                console.log("--->>", e.name);
////            });
//			console.log( names );
//        }
//    });

//	mongoose.connection.collection();
	//trying to get collection names
	mongoose.connection.db.listCollections(function (err, names) {
		if ( err ) {
			console.log( 'Error retrieving collections' );
		} else {
		 	console.log('Collections: ' + names); // [{ name: 'dbname.myCollection' }]
			module.exports.Collection = names;
		}
	});
});

// If the connection throws an error
mongoose.connection.on( 'error', function( err ) {
	console.log( 'Mongoose default connection error: ' + err );
});

// When the connection is disconnected
mongoose.connection.on( 'disconnected', function() {
	console.log( 'Mongoose default connection disconnected' );
});

// If the Node process ends, close the Mongoose connection
process.on( 'SIGINT', function() {
	mongoose.connection.close( function() {
		console.log( 'Mongoose default connection disconnected through app termination' );
		process.exit( 0 );
	});
});