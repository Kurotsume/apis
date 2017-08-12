## To run app project directory and run

node app 

This will run the app on your localserver port 3000
localserver:3000

## Keep in mind that there's no home route right now, so localserver:3000 will not get any view or do anything.
## You can set up routes in routes folder and then add them in app.js 

// app.js
var api = require('./routes/api');
app.use('/api', api);

// route.js
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Post = mongoose.model("Post");

router.route('/posts')
	.get(function(req, res){
			res.send('hello');
	});

module.exports = router;


## Remember to have mongoDB running.

Command for this is mongod
In case it's not working mongod --repair will usually fix it

## This is how you get and manipulate the data
http://mongoosejs.com/docs/guide.html

## To simulate routes you can use Postman. For example:
localhost:3000/api
localhost:3000/api/id

