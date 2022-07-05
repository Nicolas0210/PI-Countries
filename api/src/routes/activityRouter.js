const { Router } = require('express');
const router = Router();
const { postActivity, getActivities, deleteActivity } = require('./routesFunction')

router.post("/", postActivity)
router.get("/", getActivities)
router.delete("/", deleteActivity)

module.exports = router