
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const api = require('../lib/api');
const swaggerDocument = require('./swagger.json');

// Instantiate the router
const router = express.Router();

// Set up the documentation
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set the search route
router.get('/getProducts', (req, res) => {
  const searchString = req.query.search;

  api.getProducts(searchString).then( results => {
    res.send({
      searchString: searchString,
      results,
    });
  });
});

module.exports = router;
