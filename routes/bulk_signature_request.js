var express = require('express');
var router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')



router.get('/', function(req, res, next) {
    var hellosign = req.app.get('hellosign');

    hellosign.template.list().then((r) => {
      // handle response
      res.render('bulk_signature_request', { title: 'Bulk Signature Requests', templates: r.templates });
    }).catch((err) => {
      // handle error
      console.log(err);
    });
});

/* POST send a signature request . */
router.post('/', upload.single('signers_file'), function(req, res) {
    var hellosign = req.app.get('hellosign');
    var ts_hms = new Date().toISOString().slice(0, 10);

    const opts = {
            test_mode: 1,
            template_id: req.body.template_id,
            title: 'NDA with The Weird Co.',
            subject: 'The NDA we talked about',
            message: 'Please sign this NDA and then we can discuss more.',
            signer_file: req.file, 
            custom_fields: [
            {
                name: 'start_date',
                value: ts_hms
            }
            ],
        };

        console.log(opts);
      hellosign.signatureRequest.bulkSendWithTemplate(opts).then((res) => {
        // handle response
        console.log(res);
      }).catch((err) => {
        // handle error
        console.log(err);
      });
});


module.exports = router;
