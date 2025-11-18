var express = require('express');
var router = express.Router();

// Valid pages list
const validPages = ['hash', 'block', 'blockchain', 'distributed', 'tokens', 'coinbase', 'history'];

// Home page
router.get('/', function(req, res) {
  res.render('index', { title: 'Sobapps - test' });
});

// Dynamic page routing
router.get('/:page', function(req, res, next) {
  const page = req.params.page;
  
  // Validate page exists
  if (!validPages.includes(page)) {
    return next(); // Pass to 404 handler
  }
  
  res.render(page, { page: page });
});

console.log("system is running: http://localhost:3000");

module.exports = router;
