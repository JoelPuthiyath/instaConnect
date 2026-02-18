const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

const validate = require('../middleware/validate.middleware');
const authValidation = require('../validations/auth.validation');

router.get('/instagram/url', authController.getInstagramUrl);
router.post('/instagram/callback', validate(authValidation.instagramCallbackSchema), authController.instagramCallback);
router.post('/logout', authController.logout);

module.exports = router;
