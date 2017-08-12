var express = require('express');
var path = require('path');
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

// Since we don't have a process.env.databaseurl yet it will default to this local DB
// requirement is that you have mongodb running in your terminal
var url = process.env.DATABASEURL || 'mongodb://localhost:27017/chirps';
mongoose.connect(url);        

// Initialize mongoose schemas (we create them here)
var models = require('./models/models.js');         

// require api file    
var api = require('./routes/api');

// require express framework
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.static(path.join(__dirname, 'public')));

// Api route. Go to api file to see

app.use('/api', api);

// 
app.get("*", function(req, res){
    res.send("Not Found");
});

var port = process.env.PORT || '3000';
var ip = process.env.ip || 'localhost'; // SET TO YOUR WIFI IP ADDRESS

app.listen(port, ip, function(){
  console.log("Server here");
});


