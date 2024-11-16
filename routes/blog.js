var express = require('express');
var router = express.Router();
const db = require('../config/db_config.js');


/* GET about page. */
router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM articles ORDER BY date_data DESC';
  db.query(query, function(err, results) {
    if (err) {
      console.log('Impossible to retreive data : ', err);
      return res.status(500).send('Server Error');
    }
    res.render('blog', {
    title: 'Blog | Gil Vayssier',
    articles: results
    });
  });
});

router.use('/hosting', require('./hosting'));
router.use('/oop', require('./oop'));

module.exports = router;
