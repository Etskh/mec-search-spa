
const path = require('path');
const express = require('express');
const hbs = require('express-hbs');

// Local modules
const api = require('./lib/api');
const logger = require('./lib/logger');
const pkg = require('../package');

// Create the app
const app = express();

// Set up static assets
app.use(express.static('public'));

// Set up templating engine
app.engine('html', hbs.express4());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// App configuration
const config = {
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  port: process.env.PORT || 3003,
  development: process.env.NODE_ENV === 'development',
};

// Add logging to each route
app.use((req, res, next) => {
  logger.info({
    request: req.originalUrl,
    resolve: req.path,
    origin: req.ip === '::1' ? 'localhost' : req.ip,
  });
  next();
});

// Main route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'MEC Search Images',
    description: 'Searching images on MEC\'s site',
  });
});

app.get('/api', (req, res) => {
  const searchString = req.query.search;

  api.search(searchString).then( results => {
    res.send({
      searchString: searchString,
      results,
    });
  });
});

// Listen on configured port
app.listen(config.port, () => {
  logger.info([config.name, 'version', config.version, 'running on port', config.port].join(' '));
});
