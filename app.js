const https = require('https')
const fs = require('fs')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const options = {
  key: fs.readFileSync('/etc/ssl/gilvayssier.com/www.gilvayssier.com_private_key.key'),
  cert: fs.readFileSync('/etc/ssl/gilvayssier.com/www.gilvayssier.com_ssl_certificate.cer')
};

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var blogRouter = require('./routes/blog');
var gearRouter = require('./routes/gear');
var hostingRouter = require('./routes/hosting');
var oopRouter = require('./routes/oop');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/blog', blogRouter);
app.use('/gear', gearRouter);
app.use('/hosting', hostingRouter);
app.use('/oop',oopRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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

const port = 443; // Use HTTPS
https.createServer(options, app).listen(port, function() {
  console.log('Serveur HTTPS démarré sur le port : ' + port);
});

//HTTP Redirection to HTTPS
const http = require('http');
http.createServer(function(req, res) {
  res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
  res.end();
}).listen(80, function() {
  console.log('Redirection HTTP vers HTTPS activée sur le port 80');
});