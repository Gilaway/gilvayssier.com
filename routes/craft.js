var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('craft', { title: 'Craft | Gil Vayssier'});
});

module.exports = router;
