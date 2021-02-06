var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var testRouter = require('./routes/test');
var apikeyRouter = require('./routes/api_key_router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRouter);
app.use('/auth', apikeyRouter);

module.exports = app;
