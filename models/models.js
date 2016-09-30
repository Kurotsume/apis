var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	created_at: {type:Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
	username: String,
	//username: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
	created_at: { type: Date, default: Date.now},
	text: String
});

mongoose.model("User", userSchema);
mongoose.model("Post", postSchema);

//These are now in the mongoose library, so no export required...