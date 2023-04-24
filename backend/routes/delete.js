const express = require('express');
const router = express.Router();
const registerController = require('../controllers/deleteController');

router.post('/', delateController.deleteUser);

module.exports = router;