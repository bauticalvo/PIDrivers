import { DETAIL, FILTER, FILTER_TEAMS, GET_DRIVER, GET_TEAMS, ORDER, ORDER_DOB, PAGINATION, REFRESH, SEARCH } from "./actionstypes";


let initialState= {
    allDrivers: [],
    allTeams: [],
    currentPage: 0,
    allDriversBackUp: [],
    driverDetail: [],
    filter: [],
    searchDriver: [],
    orderDriver: [],
    filters: false,
    search: false,
    ordered: false
}

export const reducer = (state=initialState, {type, payload}) =>{
    const itemsPerPage = 9
    let copy = [...state.allDriversBackUp]

    switch (type) {
        case GET_DRIVER:
            return {
                ...state,
                allDrivers: [...payload].splice(0, itemsPerPage),  
                allDriversBackUp: payload                          
            }
            break;
        case GET_TEAMS:
            return{
                ...state,
                allTeams: payload
            }

        case DETAIL:
            console.log(payload);
            return {
                ...state,
                driverDetail: payload
            }
            break;
        case PAGINATION:
            const nextPage= state.currentPage + 1
            const prevPage= state.currentPage - 1
            const currentIndex= payload === 'next' ? nextPage * itemsPerPage : prevPage * itemsPerPage
           
            if(state.filters){
                if(payload === 'next' && currentIndex >= state.filter.length) return state
                else if(payload === 'prev' && prevPage < 0) return state
                return{
                    ...state,
                    allDrivers: [...state.filter].splice(currentIndex, itemsPerPage),
                    currentPage: payload === 'next' ? nextPage : prevPage
                }
            }
            if(state.search){
                if(payload === 'next' && currentIndex >= state.searchDriver.length) return state
                else if(payload === 'prev' && prevPage < 0) return state
                return{
                    ...state,
                    allDrivers: [...state.searchDriver].splice(currentIndex, itemsPerPage),
                    currentPage: payload === 'next' ? nextPage : prevPage
                }
            }
            if(state.ordered){
                if(payload === 'next' && currentIndex >= state.orderDriver.length) return state
                else if(payload === 'prev' && prevPage < 0) return state
                return{
                    ...state,
                    allDrivers: [...state.orderDriver].splice(currentIndex, itemsPerPage),
                    currentPage: payload === 'next' ? nextPage : prevPage
                }
            }
            if(payload === 'next' && currentIndex >= copy.length) return state
            else if(payload === 'prev' && prevPage < 0) return state
           
            return{
                ...state,
                allDrivers: copy.splice(currentIndex, itemsPerPage),
                currentPage: payload === 'next' ? nextPage : prevPage
            }
        case FILTER:
            switch (payload) {
                case 'All':
                    return{
                        ...state,
                        allDrivers: copy,
                        filter: [],
                        currentPage: 0,
                        filters: false
                    }


                case 'Base de datos':
                    const filterDB = copy.filter(driver => 
                        driver.hasOwnProperty('forename') === true   
                    )
                    return{
                    ...state,
                    allDrivers: filterDB,
                    filter: [],
                    currentPage: 0,
                    filters: true
                }
                    break;
                case 'Api':
                    return{
                    ...state,
                    allDrivers: copy.filter( driver => driver.hasOwnProperty('name') === true),
                    filter: [],
                    currentPage: 0,
                    filters: true
                    }
                default: return state
                    break;
            }
        case FILTER_TEAMS: 

            if(payload === 'todos'){
                return {
                    ...state,
                    allDrivers: copy.splice(state.currentPage * itemsPerPage, itemsPerPage),
                    filter: [],
                    currentPage: 0,
                    filters: false
                }
            }
            let filteredTeams= []
            copy.forEach(driver => {
                if(driver && driver.teams) {
                    if(typeof driver.teams === "string"){
                        let array = driver.teams.split(',')
                        array.forEach(t => {
                            if(t.replace(/\s/g, '') == payload.trim()) {
                                filteredTeams.push(driver)
                            }
                        })
                    } else {
                        driver.teams.forEach(t => {
                            if(t.replace(/\s/g, '') == payload.trim()) {
                                filteredTeams.push(driver)
                            }
                        })
                    }
                }
            })
            return {
                ...state,
                allDrivers: [...filteredTeams].splice(0,itemsPerPage),
                filter: filteredTeams,
                currentPage: 0,
                filters: true
            }
        case ORDER:
            let order = copy.sort((a,b)=>{
                       let prev = a.hasOwnProperty('forename') ? a.forename : a.name.forename
                       let next = b.hasOwnProperty('forename') ? b.forename : b.name.forename
                        return prev.localeCompare(next, 'es', { sensitivity: 'base' })
                    })
             
            if(payload === 'AZ'){
                return {
                        ...state,
                        allDrivers:[...order].splice(0,itemsPerPage),
                        allDriversBackUp: order,
                        orderDriver: order,
                        currentPage: 0,
                        ordered: true
                    }
            }
            if(payload === "ZA"){
                return {
                    ...state,
                    allDrivers:[...order.reverse()].splice(0,itemsPerPage),
                    allDriversBackUp: order,
                    orderDriver: order,
                    currentPage: 0,
                    ordered: true
                }
            }               
            

        case ORDER_DOB:
            const orderDob = copy.sort((a, b) => {
                const dateA = new Date(a.dob);
                const dateB = new Date(b.dob);
                return dateA - dateB;
              })     
              
              if(payload === 'Mayor a Menor'){
                return{
                        ...state,
                        allDrivers: [...orderDob].splice(0,itemsPerPage),
                        allDriversBackUp: orderDob,
                        orderDriver: orderDob,
                        currentPage: 0,
                        ordered: true

                }
            }
            if(payload === 'Menor a Mayor'){
                return{
                        ...state,
                        allDrivers: [...orderDob.reverse()].splice(0,itemsPerPage),
                        allDriversBackUp: orderDob,
                        orderDriver: orderDob,
                        currentPage: 0,
                        ordered: true
                }
            }
        case SEARCH:
            console.log(payload);
            if(payload.length === 0){
                alert("No se encontraron resultados similares")
                return
            }  
            return {
                ...state,
                    allDrivers: [...payload].splice(0,itemsPerPage),
                    searchDriver: payload,
                    currentPage: 0,
                    search: true
            }
        case REFRESH:
            return {
                ...state,
                allDrivers: [...payload].splice(0, itemsPerPage),  
                allDriversBackUp: payload,
                currentPage: 0                          
            }

        default: return state
            break;
    }
}