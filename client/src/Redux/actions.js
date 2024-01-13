import axios from 'axios'
import { GET_DRIVER } from './actionstypes';


export function postDriver(data){
    return async function(dispach){
        try {
        await axios.post("http://localhost:3001/drivers/", data)
            alert("Driver creado con exito")
        } catch (error) {
            alert(error.response.data.error)
        }
    }
    
}
export function getDriver(){
    return async function(dispach){
        try {
      const {data} = await axios.get("http://localhost:3001/drivers/")
            dispach({                                                           // este dispacth manda al reducer un objeto {type: GET_DRIVER, payload: data}
                type: GET_DRIVER,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}