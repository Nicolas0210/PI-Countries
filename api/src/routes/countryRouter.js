const { Router } = require('express');
const router = Router();
const { getCountries, detailedCountry } = require('./routesFunction')

router.get("/", getCountries)
router.get("/:countryId", detailedCountry)


module.exports = router