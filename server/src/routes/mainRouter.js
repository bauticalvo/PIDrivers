const { Router } = require("express");
const router = Router();
const driverRouter = require('../routes/driverRouter')
const teamsRouter = require('../routes/teamsRouter')

router.use('/drivers', driverRouter)
router.use('/teams', teamsRouter)


module.exports = router;
