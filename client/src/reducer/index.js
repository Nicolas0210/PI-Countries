const initialState = {
    allCountries: [],
    countries: [], // aca guardo todos los countries
    activities: [], // aca las actividades
    countryDetails: {}, // aca el country por id (detailedCountry, este va a ser uno solo por eso es objeto)
    filteredCountries: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_ALL_COUNTRIES":
            return{
                ...state,
                allCountries: action.payload,
                countries: action.payload,
                filteredCountries: action.payload // esto es para cuando traigo a todos los paises por primera vez los meta en filteredCoutries tambien (para el filtro de All continents)
            }
        case "GET_COUNTRY_BY_NAME":
            return{
                ...state,
                countries: action.payload,
                filteredCountries: action.payload
            }
        case "GET_DETAILED_COUNTRY":
            return{
                ...state,
                countryDetails: action.payload
            }
        case "FILTER_BY_CONTINENT":
            const allCountries = state.countries
            const countriesFilter = action.payload === "All" ? allCountries : allCountries.filter(country => country.continents === action.payload)
            return{
                ...state,
                filteredCountries: countriesFilter
            }
        case "ORDER_BY_NAME":
            const sorteredCountries = action.payload === "Asc" ? 
                state.filteredCountries.sort(function(a, b){
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                        return -1
                    }
                    return 1
                }) : 
                state.filteredCountries.sort(function(a, b){
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1
                    }
                    return -1
                })
            return{
                ...state,
                filteredCountries: sorteredCountries
            }
        case "ORDER_BY_POPULATION":
            const sorteredCountries2 = action.payload === "Ascendente" ?
                state.filteredCountries.sort(function(a, b){
                    if(a.population > b.population){
                        return -1
                    }
                    if(b.population > a.population){
                        return 1
                    }
                    return -1
                }) :
                state.filteredCountries.sort(function(a, b){
                    if(a.population > b.population){
                        return 1
                    }
                    if(b.population > a.population){
                        return -1
                    }
                    return 1
                })
            return{
                ...state,
                filteredCountries: sorteredCountries2
            }
        case "GET_ACTIVITIES":
            return{
                ...state,
                activities: action.payload
            }    
        case "FILTER_ACTIVITIES":
            const countries = state.countries
            if(action.payload === "All-countries"){
                return{
                    ...state,
                    filteredCountries: countries
                }
            }else{
                //console.log(action.payload)
                const filteredCountries = countries.filter(country => {
                    //console.log(country)
                    for(let i = 0; i < country.touristActivities?.length; i++){
                        //console.log(country.touristActivities[i].name)
                        if(country.touristActivities[i].name === action.payload){
                            return true
                        }
                    }
                    return false
                }
                )
                //console.log(state.filteredCountries)
                return{
                    ...state,
                    filteredCountries: filteredCountries
                }
            }
        case "CLEAN_COUNTRY_DETAILS":
            return{
                ...state,
                countryDetails: {}
            }
        
        default: return state
    }
}