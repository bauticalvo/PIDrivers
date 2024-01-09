const {getTeams} = require('../controllers/teamsController')

const getTeamsHandler = async(req,res) =>{
    try {
        const response = await getTeams();
        res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

module.exports = {getTeamsHandler};