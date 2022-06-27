const { Router } = require('express');
const router = Router();
const { postActivity } = require('./routesFunction')

router.post("/", postActivity)

module.exports = router