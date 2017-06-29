const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const dotenv = require('dotenv');



// Set up the express app
const app = express();
const compiler = webpack(config);

const env = process.env.NODE_ENV || 'development';
if (env !== 'production') {
  dotenv.config();
}

if (env === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.use(passport.initialize());
app.use((req, res, next) => {
  req.user = {};
  const auth = req.get('access-token');
  if (typeof auth !== 'undefined') { req.user.roles = auth.split(' '); } else { req.user.roles = []; }
  next();
});

require('../server/routes')(app);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = app;
