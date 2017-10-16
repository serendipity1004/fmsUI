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
    let renderAll = !!req.session.template;
    console.log(req.session.products)

    res.render('first', {
        renderAll: encodeURIComponent(JSON.stringify(renderAll)),
        templateFront:req.session.template,
        template:encodeURIComponent(JSON.stringify(req.session.template)),
        products:encodeURIComponent(JSON.stringify(req.session.products)),
        js: ['first.js'],
        css: ['first.css']
    })
});

router.get('/third', (req, res) => {

    res.render('third', {
        js: ['third.js'],
        css: ['third.css']
    })
})

router.get('/second', (req, res) => {
    console.log('get template')
    console.log(req.session.template)
    console.log(req.session.products)

    if (req.session.template) {

        res.render('second', {
            template: req.session.template,
            products:req.session.products,
            js: ['second.js'],
            css: ['second.css']
        })
    } else {

        res.render('second', {
            js: ['second.js'],
            css: ['second.css']
        })
    }
});

router.post('/second', (req, res) => {
    let body = req.body.template;
    console.log('checked');
    console.log(req.body.products);

    console.log(body)

    req.session.template = body;
    req.session.products = req.body.products;

    console.log(req.session.products)

    res.json({done: true})
});

module.exports = router;
