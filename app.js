var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var strategy = require('./middleware/passport-strategy');
var session = require('express-session')
var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customer');
var supplierRouter = require('./routes/supplier');
var adminRouter = require('./routes/admin');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').config({ debug: process.env.DEBUG })
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', indexRouter);
app.use('/', customerRouter);
app.use('/admin', adminRouter);
app.use('/supplier', supplierRouter);

// mongoose/DB

var mongoURI;

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
  // return start_up();
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

mongoURI = "mongodb://localhost/ecommerce";

// config.MONGOOSE = mongoose.connect(mongoURI);
mongoose.connect(mongoURI);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done){

  done(null,user)
});
passport.deserializeUser(function(user,done){
  done(null,user);
});

strategy.custom();
strategy.local();
// strategy.google0auth();


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
