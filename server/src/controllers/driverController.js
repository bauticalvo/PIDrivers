const {Driver, Teams} = require('../db')
const axios = require('axios')

const defaultImage = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fst3.depositphotos.com%2F9141348%2F14671%2Fv%2F450%2Fdepositphotos_146717605-stock-illustration-user-icon-vector.jpg&tbnid=4286uwW2fCuhSM&vet=12ahUKEwjDtvix77CDAxWyNDUKHeMUBysQMygCegQIARA5..i&imgrefurl=https%3A%2F%2Fdepositphotos.com%2Fes%2Fphotos%2Fsin-rostro.html&docid=E0xyy5WHSqq_qM&w=600&h=600&itg=1&q=imagen%20de%20persona%20sin%20cara&hl=es&ved=2ahUKEwjDtvix77CDAxWyNDUKHeMUBysQMygCegQIARA5'

const getDriversDB = async() => {
    const driversDB = await Driver.findAll({  //trae los modelos relacionados de la DB
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
            image: driver.image,
            dob: driver.dob,
            nationality: driver.nationality,
            teams: driver.Teams.map(team => team.name)
            ,
            description: driver.description
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
    const allDrivers = [...driversDB, ...driversApi] //se puede cambiar el orden

    allDrivers.forEach(async driver=>{
        if(!driver.image){
            driver.image = defaultImage;
        }
    })
    if(name){
        const driver = allDrivers.filter(driver => 
            driver.name.forename.toLowerCase().includes(name.toLowerCase())
            )
        return driver.splice(0,15);
    }
    
    return allDrivers;
}

    const getDriversId = async (id)=>{
        if(isNaN(id)){
            const idDriver = await Driver.findByPk(id)
        return idDriver;
        }
        const request = (await axios.get('http://localhost:5000/drivers')).data
        const filteredDrivers = request.find( (driver) => driver.id === Number(id) 
        )
        return filteredDrivers;
}

const getDriversName = async (name)=>{
    const allDrivers = getDrivers();
    if(name){
        const driver = allDrivers.filter(driver => 
            driver.name.forename.toLowerCase().include(name.toLowerCase())
            )
        return driver.splice(0,15);
    }
}
    // -------- SE CREA UN DRIVER -------- //

const postDrivers = async(forename, surname, image, dob, nationality, 
     description, teams)=>{
       
        const driver = await Driver.create({           // no se puede hacer con findOrCreate ya que este trae un arreglo con la instancia creada y un booleano que indica si se creo o no
            
             forename, surname, image, dob, nationality, 
         description
        })
       // -------- RELACION DRIVER-TEAMS -------- //

        teams.forEach( async(team) => {                // el arreglo teams pasado por parametro lo recorremos
            let teamDB= await Teams.findAll({          //creamos una variable para buscar todos los teams de la DB
                where: {name : team}                   // donde el nombre coincida con el team de la DB
            })
            await driver.addTeams(teamDB)              //agregamos el team al driver creado
            console.log('Team agregado con exito');
        })
        console.log("  ----  Driver creado con exito  ----  ");
        
        return driver;
        
}

module.exports = {getDrivers, getDriversId, getDriversName, postDrivers} ; 

//console.log(allDrivers[1].teams.split(', ').join(',').split(','));