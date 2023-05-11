const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const config = require('./config');
const routes = require('./routes/index');

// connect to MongoDB server
mongoose.connect(config.db.uri);

// create app
const app = express();

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// use routes
app.use('/', routes);

// listen connections
app.listen(config.app.port);
