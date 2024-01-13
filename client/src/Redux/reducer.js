import { GET_DRIVER } from "./actionstypes";


let initialState= {
    allDrivers: [],
    allTeams: []
}

export const reducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_DRIVER:
            return {
                ...state,
                allDrivers: action.payload         // la data que traemos desde el back end
            }
            break;
    
        default: return state
            break;
    }
}