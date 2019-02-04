const express = require('express');
const path = require("path");
const http = require ('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
=======
>>>>>>> 4f5b638e5b048941e58d66b2443652d69e534ba2

// DB Setup
mongoose.connect(
  "mongodb://jefflee:testing1@ds119085.mlab.com:19085/recipes",
  { useNewUrlParser: true }
);

// App Setup

<<<<<<< HEAD
=======
app.use(express.static(path.join(__dirname, "client/build")));
>>>>>>> 4f5b638e5b048941e58d66b2443652d69e534ba2

app.use(morgan('combined')); // express middleware. Morgan is a logging framework
app.use(cors());
app.use(bodyParser.json({ type:'*/*'})); // express middleware. Used to parse incoming requests into json, no matter what the request type is.
router(app);

<<<<<<< HEAD
=======
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
>>>>>>> 4f5b638e5b048941e58d66b2443652d69e534ba2

// Server Setup

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening on:', port);