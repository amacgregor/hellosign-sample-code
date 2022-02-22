var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
      res.render('index', { title: 'Signature Requests' });
});

/* POST send a signature request . */
router.post('/', function(req, res) {
    var hellosign = req.app.get('hellosign');
    var ts_hms = new Date().toISOString().slice(0, 10)

const opts = {
        test_mode: 1,
        template_id: '7ae4732c4a55b70bf0929ee7c2554183f2ec1d85',
        title: 'NDA with The Weird Co.',
        subject: 'The NDA we talked about',
        message: 'Please sign this NDA and then we can discuss more.',
        signers: [
          {
            email_address: 'hp@lovecraft.com',
            name: 'HP',
            role: 'Contractor'
          }
        ], 
        custom_fields: [
          {
            name: 'start_date',
            value: ts_hms
          }
        ],
      };
      hellosign.signatureRequest.sendWithTemplate(opts).then((res) => {
        // handle response
        console.log(res);
      }).catch((err) => {
        // handle error
        console.log(err);
      });
});


module.exports = router;
