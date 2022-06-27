import axios from 'axios'

export function getAllCountries(){
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/countries`)
        dispatch({
            type: "GET_ALL_COUNTRIES",
            payload: response.data
        })
    }
}

export function getCountryByName(name){
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/countries?name=${name}`)
        dispatch({
            type: "GET_COUNTRY_BY_NAME",
            payload: response.data
        })
    }
}

export function getDetailedCountry(id){
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/countries/${id}`)
        dispatch({
            type: "GET_DETAILED_COUNTRY",
            payload: response.data
        })
    }
}

export function postActivity(props){
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/activity`,{
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props)    
        })
        return{
            type: "POST_ACTIVITY",
            payload: response.data
        }
    }
}

export function filterCountryByContinent(payload){ //este payload es el value de cada option que yo setee en mi home
    return{
        type: "FILTER_BY_CONTINENT",
        payload
    }
}

// export function filterCountryByActivities(payload){ //este paylaoad va a ser el nombre de la actividad creada
//     return{
//         type: "FILTER_ACTIVITIES",
//         payload
//     }
// }

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: "ORDER_BY_POPULATION",    
        payload
    }
}