const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const config = require('./config');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// connect to MongoDB server
mongoose.connect(config.db.uri);

// create app
const app = express();

// use request logger
app.use(requestLogger);

// parse cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// use cors
app.use(cors);

// use routes
app.use('/', routes);

// use error logger
app.use(errorLogger);

// input validation error handler (celebrate, joi)
app.use(errors());

// use common error handler
app.use(errorHandler);

// listen connections
app.listen(config.app.port);
