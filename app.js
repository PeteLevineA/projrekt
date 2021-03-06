var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var konfig = require('konfig')();

var projects = require('./routes/projects');
//var index = require('./routes/index');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// Mongoose Setup
//mongoose.connect(konfig.app.mongodb.connection_string);
var MongoDB = mongoose.connect(konfig.app.mongodb.connection_string).connection;
MongoDB.on('error', function (err) { console.log(err.message); });
MongoDB.once('open', function () {
    console.log("mongodb connection open");
}); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bin')));

app.use('/projects', projects);
app.use('/proj/*', function(req, res) {
  res.redirect('/');
});
//app.use('/', index);

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
    res.status(err.status || 500);
    res.json({'error': {
        'message': err.message,
        'error': err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'error': {
      'message': err.message,
      'error': {}
  }});
});

module.exports = app;
