const { Router } = require('express');
const countryRouter  = require('./countryRouter')
const activityRouter = require('./activityRouter')
const router = Router();

router.use("/countries", countryRouter)
router.use("/activity", activityRouter)


module.exports = router;
