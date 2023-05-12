const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');
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

// automatically adding or removing HTTP headers to comply with web security standards
app.use(helmet());

// use cors
app.use(cors);

// limit the number of requests
app.use(rateLimiter);

// use routes
app.use('/api', routes);

// use error logger
app.use(errorLogger);

// input validation error handler (celebrate, joi)
app.use(errors());

// use common error handler
app.use(errorHandler);

// listen connections
app.listen(config.app.port);
