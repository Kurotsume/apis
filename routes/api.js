var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Post = mongoose.model("Post");
var User = mongoose.model("User");

//INDEX 
//NEW(form) 
//CREATE (create)
//SHOW
//EDIT(form) 
//PUT(update)
//DELETE 

//Used for routes that must be authenticated.
isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	res.redirect('/#login');
};

router.use('/posts', isAuthenticated);

router.route('/posts')
	//INDEX
	.get(function(req, res){
		Post.find(function(err, posts){
			if(err){
				return res.send(500, err);
			} 
			return res.send(posts);
		});
	})
	//CREATE
	.post(function(req, res){
		var newPost = { 
			username: req.body.username,
			text: req.body.text
		};

		Post.create(newPost, function(err, post){
			if(err){
				res.send(500, err);
			}
			res.json(post);
		});
	});

//
router.route('/posts/:id')
	//SHOW
	.get(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err){
				res.send(err);
			}
			res.json(post);
		});
	})
	//PUT
	.put(function(req, res){
		var newPost = {
			username: req.body.username, 
			text: req.body.text
		};

		Post.findByIdAndUpdate(req.params.id, newPost, function(err, updatedPost){
			if(err){
				res.send(err);
			}
			res.json(updatedPost);
		});
	})
	//DELETE
	.delete(function(req, res){
		Post.removeByIdAndRemove(req.params.id, function(err){
			if(err){
				res.send(err);
			}
			res.send("deleted");
		});
	});

module.exports = router;