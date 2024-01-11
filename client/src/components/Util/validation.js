
export default function validation(driverData, name){
    const errors = {};
    

    console.log(driverData);
    console.log(name);
    if(name === 'forename'){
        if(!driverData.forename.length) errors.name = "Debe ingresar un nombre"
        if(driverData.forename.length >0){
            if(driverData.forename.length > 15) errors.name = "El nombre no debe tener mas de 15 caracteres"
            if(driverData.forename.length < 3) errors.name = "El nombre no debe tener menos de 3 caracteres"
            if(!regexChar.test(driverData.forename)) errors.name = 'El nombre no debe tener caracteres especiales'
        }
        
    }
   
    console.log(errors);
    return errors;
}