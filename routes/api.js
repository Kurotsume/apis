var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Post = mongoose.model("Post");


// routes that will use /posts
router.route('/posts')

	// SHOW all posts
	.get(function(req, res){


		Post.find(function(err, posts){
			if(err){
				return res.send(500, err);
			} 
			return res.send(posts);
		});
	})

	//CREATE one POST
	.post(function(req, res){

		// create a new post object based on the req.body information received.
		var newPost = { 
			username: req.body.username,
			text: req.body.text
		};
		console.log(req.body)
		console.log("USERNAME ------------------" + req.body.username);

		// mongood function to create
		// first param - db object (above)
		// second function to handle process

		Post.create(newPost, function(err, post){ // err, post are defaults (you can name them anything u want)
			if(err){
				res.send(500, err); // send error along with 500 status
			}
			res.json(post); // if no error send backs post
		});
	});

// routes that will use /post/:id
router.route('/posts/:id')

	//SHOW POST by ID
	.get(function(req, res){

		// Mongoose's way of finding by ID. You can see mongoose website for examples of this.
		Post.findById(req.params.id, function(err, post){ //err, post are defaults

			if(err){
				res.send(err);
			}
			// send the found post in a json response.
			res.json(post);
		});
	})

	//PUT POST
	.put(function(req, res){

		// create a newpost object based on the request's body information
		var newPost = {
			username: req.body.username, 
			text: req.body.text
		};

		// find this post by id
		// first param - id
		// second param - updated post
		// function to handle the process.
		Post.findByIdAndUpdate(req.params.id, newPost, function(err, updatedPost){ //
			if(err){
				res.send(err);
			}

			// send back updated post 
			res.json(updatedPost);
		});
	})

	//DELETE POST
	.delete(function(req, res){


		Post.removeByIdAndRemove(req.params.id, function(err){
			if(err){
				res.send(err);
			}
			res.send("deleted");
		});
	});

module.exports = router;