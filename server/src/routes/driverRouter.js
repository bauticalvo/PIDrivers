const { Router } = require("express");
const {getDriversHandler, postDriversHandler, getDriversIdHandler,
    getDriversNameHandler
} = require('../handlers/driverHandler')

const driverRouter = Router();

driverRouter.get('/', getDriversHandler)
driverRouter.get('/:id', getDriversIdHandler)
driverRouter.get('/', getDriversNameHandler)
driverRouter.post('/', postDriversHandler)

module.exports = driverRouter;