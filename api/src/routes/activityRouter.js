const { Router } = require('express');
const router = Router();
const { postActivity, getActivities } = require('./routesFunction')

router.post("/", postActivity)
router.get("/", getActivities)

module.exports = router