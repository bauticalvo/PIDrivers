const {Teams} = require('../db')
const axios = require('axios')

const getTeams = async() =>{
    const dbTeams = await Teams.findAll()
    if(!dbTeams.length){
        const {data} = await axios.get('http://localhost:5000/drivers')
        let array = [];
        data.forEach(driver => 
            array.push(driver.teams)
            )
        let filteredTeams = new Set(array.join().split(' ').join('').split(','))
        let allTeams = [...filteredTeams].filter(team => team !== '')
        let teams = [...allTeams]
        teams.forEach(async (teams) => 
           await Teams.findOrCreate({where: {name: teams}})
            )
        console.log('Teams cargados en la base de datos');
        return teams;
    }
        console.log('Teams encontrados en la base de datos');
     return dbTeams.map(teams => teams.name)
}

module.exports = {getTeams}

