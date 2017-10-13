let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {


    res.render('login', {
        js: ['login.js'],
        css: ['login.css']
    });
});

router.get('/first', (req, res) => {

    res.render('first', {
        js:['first.js'],
        css:['first.css']
    })
});

module.exports = router;
