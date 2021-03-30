const { Router } = require('express');
const { createAccount } = require('../controllers/user.controller');
const { checkEmail, checkUserName } = require('../middleware/user.middleware');
const router = Router();

router.post('/', [checkEmail, checkUserName], createAccount);

module.exports = router;