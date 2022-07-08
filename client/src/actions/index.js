import axios from 'axios'

export function getAllCountries(){
    return async function(dispatch){
        const response = await axios(`/countries`)
        dispatch({
            type: "GET_ALL_COUNTRIES",
            payload: response.data
        })
    }
}


export function getCountryByName(name){
    return async function(dispatch){
        const response = await axios(`/countries?name=${name}`)
        dispatch({
            type: "GET_COUNTRY_BY_NAME",
            payload: response.data
        })
    }
}

export function getDetailedCountry(id){
    return async function(dispatch){
        const response = await axios(`/countries/${id}`)
        dispatch({
            type: "GET_DETAILED_COUNTRY",
            payload: response.data
        })
    }
}

export function postActivity(props){
    return async function(dispatch){
        const response = await axios.post(`/activity`, props)
        return response
    }
}

export function filterCountryByContinent(payload){ 
    return{
        type: "FILTER_BY_CONTINENT",
        payload
    }
}

export function filterCountryByActivities(payload){ 
    return{
        type: "FILTER_ACTIVITIES",
        payload
    }
}

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

export function getActivities(){
    return async function (dispatch){
        const response = await axios(`/activity`)
        dispatch({
            type: "GET_ACTIVITIES",
            payload: response.data
        })
    }
}

export function deleteActivity(countryName, activityId){
    return async function (dispatch){
        const response = await axios.delete(`/activity`, {data :{countryName, activityId}})
    }
}
