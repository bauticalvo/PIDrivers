const {getDrivers,postDrivers, getDriversId} =require('../controllers/driverController')

const getDriversHandler = async(req,res) =>{
    try {
        const {name} = req.query
        const response = await getDrivers(name)
        res.status(200).json(response)
    } catch (error) {
    return res.status(400).json({message: error.message})
    }
}

const getDriversIdHandler = async(req,res) =>{
    try {
        const {id} = req.params;
        const response = await getDriversId(id);
        res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}



const postDriversHandler = async(req, res) =>{
    try {
        const {forename, surname, description,image,
             nationality,dob,teams } = req.body;
        const response = await postDrivers(forename, surname,
             description,image, nationality,dob,teams);
        res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}


module.exports = {getDriversHandler, 
    postDriversHandler, getDriversIdHandler}