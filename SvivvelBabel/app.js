var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var fs = require("fs");
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
// ---------------------------------------------------
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// ---------------------------------------------------

// set up mongoose
// ---------------------------------------------------
mongoose.connect("mongodb://root:root@ds063889.mongolab.com:63889/svivvelbabel");
//----------------------------------------------------

// load all files in Models directory
fs.readdirSync(__dirname + "/Models").forEach(function(fileName){
    if(fileName.indexOf(".js")) require(__dirname + "/Models/" + fileName);
})

app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      console.error("Cought an error.");
      console.error(err.message);
      console.error(err.stack);
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.use(function(err, req, res, next){
  console.error("Cought an error.")
  console.error(err.stack);
  console.error(err);
});

module.exports = app;
