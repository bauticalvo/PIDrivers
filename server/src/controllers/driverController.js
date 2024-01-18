const {Driver, Teams} = require('../db')
const axios = require('axios')


const getDriversDB = async() => {
    const driversDB = await Driver.findAll({  
        include:
            {
                model: Teams,
                through:{
                    attributes: []
                }

            }
        
    });
    const driverMap = driversDB.map(driver =>{
        return {
            id: driver.id,
            forename: driver.forename,
            surname: driver.surname,
            description: driver.description,
            image: driver.image,
            nationality: driver.nationality,
            teams: driver.Teams.map(team => team.name),
            dob: driver.dob,
            
        }
    })
    
    return driverMap;
}

const getDriversAPI = async()=>{
    const {data} = await axios.get('http://localhost:5000/drivers')
    return data;
}

const getDrivers =async (name) =>{    
    const driversDB = await getDriversDB();
    const driversApi = await getDriversAPI();
    const allDrivers = [...driversDB, ...driversApi] 
    if(name){
        let driverName = []
        allDrivers.forEach(driver => {
            if(driver){
                 if(driver.hasOwnProperty('name') && driver.name.forename.toLowerCase().includes(name.toLowerCase())) {
                driverName.push(driver)
                return
               
            } else if( driver.hasOwnProperty('forename') && driver.forename.toLowerCase().includes(name.toLowerCase())) {
                driverName.push(driver)
                return
            }
            }
           
    })
        return driverName.splice(0,15);
    }
    
    return allDrivers;
}

    const getDriversId = async (idD)=>{
        if(isNaN(idD)){
            const idDriver = await Driver.findByPk(idD)
            const {id, forename, surname, description,image, nationality,dob } = idDriver
            const d = {id, forename, surname, description,image, nationality,dob }
            const dbDriver = await getDriversDB()
            await dbDriver.forEach( driver => {
                if(driver.id == idD) d.teams = driver.teams
            })
        return d;
        }
        const request = (await axios.get('http://localhost:5000/drivers')).data
        const filteredDrivers = request.find( (driver) => driver.id === Number(idD) 
        )
        return filteredDrivers;
}



const postDrivers = async(forename, surname,description, image, nationality,dob, 
      teams)=>{
     
        const driver = await Driver.create({           
            
             forename, surname, description,image, nationality,dob 
         
        })
      

        teams.forEach( async(team) => {               
            let teamDB= await Teams.findAll({          
                where: {name : team}                   
            })
            await driver.addTeams(teamDB)              
            console.log('Team agregado con exito');
        })
        console.log("  ----  Driver creado con exito  ----  ");
        
        return driver;
        
}

module.exports = {getDrivers, getDriversId, postDrivers} ; 

//console.log(allDrivers[1].teams.split(', ').join(',').split(','));