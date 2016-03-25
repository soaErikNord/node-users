var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create a new user into the user collection
router.post('/adduser', function(req, res, next) {
	console.log( 'Request: ' + JSON.stringify( req.body ) );
	var inUser = req.body;
	new User({
		user_id		: inUser.user_id,
        first_name	: inUser.first_name,
        last_name 	: inUser.last_name,
        password	: inUser.password,
        profession	: inUser.profession
	}).save( function( err, user, count ) {
		if( err ) return next( err );

		res.send( 200 );
	});
//	// Set our internal DB variable
//	var db = req.db;
//	console.log( req );
//	// Set the DB collection
//	var collection = db.get('usercollection');
//
//	// Submit into the collection
//	collection.insert( req, function(err, doc) {
//		if ( err ) {
//			// If it failed, return an error
//			res.end( '500' );
//		} else {
//			// return a success
//			res.end( '200' );
//		}
//	});
});

// Get all users from the user collection
router.get('/getAll', function(req, res, next) {
	// print out the inbound headers
	console.log( 'Headers: ' + JSON.stringify( req.headers ) );

	User.
		find({}).
			sort( 'id' ).
			exec( function ( err, usercollection ) {
				if ( err ) return next ( err );

				console.log( 'Users: ' + usercollection );

				res.json( usercollection );
			});
});

// Read a user from the user collection and return it
router.get('/:id', function (req, res, next) {
	// Set our internal DB variable
	var db = req.db;

	// Set the DB collection
	var collection = db.get('usercollection');

	collection.find({}, {}, function(e, docs) {
		res.end( JSON.stringify(docs) );
	});
	// First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	   users = JSON.parse( data );
	   var user = users["user" + req.params.id]
	   console.log( user );
	   res.end( JSON.stringify(user));
   });
});

// Update a user in the user collection

// Delete an existing user from the user collection

module.exports = router;
