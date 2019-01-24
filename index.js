const express = require('express');
const http = require ('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost/auth', { useNewUrlParser: true});

// App Setup

app.use(morgan('combined')); // express middleware. Morgan is a logging framework
app.use(bodyParser.json({ type:'*/*'})); // express middleware. Used to parse incoming requests into json, no matter what the request type is.
router(app);

// Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on:', port);