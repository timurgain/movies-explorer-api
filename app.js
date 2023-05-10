const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

// connect to MongoDB server
mongoose.connect(config.db.uri);

// create app
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});


// listen connections
app.listen(config.app.port);
