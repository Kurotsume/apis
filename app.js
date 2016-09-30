var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose'); 
//If connected from AWS process.env.DATABASEURL will exist
var url = process.env.DATABASEURL || 'mongodb://localhost:27017/chirps';
mongoose.connect(url);        

//initialize mongoose schemas
var models = require('./models/models.js');               
var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authenticate);
app.use('/api', api);

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

app.get("*", function(req, res){
    res.send("Not Found");
});
var port = process.env.PORT || '3000';

app.listen(port);


