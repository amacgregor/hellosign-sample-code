var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var hellosign = req.app.get('hellosign');

  hellosign.template.list().then((r) => {
    // handle response
    res.render('index', { title: 'Express', templates: r.templates });
  }).catch((err) => {
    // handle error
    console.log(err);
  });
});

module.exports = router;
