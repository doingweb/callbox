var
  express = require('express'),
  router = express.Router(),
  gatekeeper = require('../controllers/gatekeeper');

router.get('/', gatekeeper.pickup);
router.post('/', gatekeeper.validateCode);

module.exports = router;
