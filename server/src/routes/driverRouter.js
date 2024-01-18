const { Router } = require("express");
const {getDriversHandler, postDriversHandler, getDriversIdHandler    
} = require('../handlers/driverHandler')

const driverRouter = Router();

driverRouter.get('/', getDriversHandler)
driverRouter.get('/:id', getDriversIdHandler)
driverRouter.post('/', postDriversHandler)

module.exports = driverRouter;