var express = require('express');
var router = express.Router();
const db = require('../config/db_config.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    const query = 'SELECT * FROM articles ORDER BY id DESC';
    db.query(query, function (err, results) {
        if (err) {
            console.log('Impossible to retreive data : ', err);
            return res.status(500).send('Server Error');
        }
        res.render('index', {
            title: 'Gil Vayssier',
            articles: results
        });
    });
});

module.exports = router;
