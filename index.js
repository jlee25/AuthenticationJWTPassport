const express = require('express');
const path = require("path");
const http = require ('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express(); //
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// DB Setup

const DBURI = process.env.MONGODB_URI || "mongodb://jefflee:testing1@ds119085.mlab.com:19085/recipes";
mongoose.connect(DBURI,
  { useNewUrlParser: true }
);

// App Setup


app.use(morgan('combined')); // express middleware. Morgan is a logging framework
app.use(cors());
app.use(bodyParser.json({ type:'*/*'})); // express middleware. Used to parse incoming requests into json, no matter what the request type is.
router(app);

// Server Setup

let port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});