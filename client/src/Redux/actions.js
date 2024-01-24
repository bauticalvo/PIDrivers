import axios from 'axios'
import { DETAIL, FILTER, FILTER_TEAMS, GET_DRIVER, GET_TEAMS, ORDER, ORDER_DOB, PAGINATION, REFRESH, SEARCH } from './actionstypes';


export function postDriver(data){
    return async function(dispach){
        try {
        await axios.post("http://localhost:3001/drivers/", data)
            alert("Conductor creado con exito")
        } catch (error) {
            alert('No se logro crear un Conductor')
            console.log(error);
        }
    }
    
}
export function getDrivers(){
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
export function getDriver(idD){
    console.log(idD);
    return async function(dispach){
        try { console.log(idD);
      const {data} = await axios.get(`http://localhost:3001/drivers/${idD}`); 
            dispach({                                                          
                type: DETAIL,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}
export function getTeams(){
    return async function(dispach){
        try {
      const {data} = await axios.get('http://localhost:3001/teams/')
            dispach({                                       
                type: GET_TEAMS,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}

export function page(order){
    return async function(dispach){
        try {
            dispach({                                                          
                type: PAGINATION,
                payload: order
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}

export function filter(order){
    return async function(dispach){
        try {
            dispach({                                                           
                type: FILTER,
                payload: order
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}
export function filterTeams(value){
    return async function(dispach){
        try {
            dispach({                                                           
                type: FILTER_TEAMS,
                payload: value
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}
export function order(order){
    return async function(dispach){
        try {
            dispach({                                                           
                type: ORDER,
                payload: order
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}
export function orderDob(order){
    return async function(dispach){
        try {
            dispach({                                                           
                type: ORDER_DOB,
                payload: order
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}
export function driverSearch(search){
    return async function(dispach){
        try {
      const {data} = await axios.get(`http://localhost:3001/drivers?name=${search}`)
            dispach({                                       
                type: SEARCH,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}
export function refresh(value){
    return async function(dispach){
        try {
            dispach({                                                           
                type: REFRESH,
                payload: value
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}