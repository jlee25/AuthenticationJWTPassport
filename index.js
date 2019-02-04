const express = require('express');
const http = require ('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect(
  "mongodb://jefflee:testing1@ds119085.mlab.com:19085/recipes",
  { useNewUrlParser: true }
);

// App Setup

app.use(morgan('combined')); // express middleware. Morgan is a logging framework
app.use(cors());
app.use(bodyParser.json({ type:'*/*'})); // express middleware. Used to parse incoming requests into json, no matter what the request type is.
router(app);

// Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on:', port);