import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getDetailedCountry } from '../../actions'
import { Link } from 'react-router-dom'

export default function CountryDetails(props){
    const dispatch = useDispatch()
    const {id} = useParams()
    //console.log(id)

    useEffect(() => {
        dispatch(getDetailedCountry(id))
    },[dispatch])

    const country = useSelector(state => state.countryDetails)
    //console.log(country)
    return(
        <div>
            <div>
                <Link to="/home">
                    <button>Back to Home</button>
                </Link>
                <img src={country.flag}/>
                <h1>Name: {country.name}</h1>
                <p>Code: {country.id}</p>
                <p>Continent: {country.continents}</p>
                <p>Capital: {country.capital? country.capital : "None"}</p>
                <p>Sub-region: {country.sub_region}</p>
                <p>Area: {country.area} km²</p>
                <p>Population: {country.population}</p>
                <span>Activity/es: 
                    {
                    country.touristActivities?.map((activity) => {
                        return(
                            <div>
                                <p>Name: {activity.name}</p>
                                <p>Dificulty: {activity.dificulty}</p>
                                <p>Duration: {activity.duration}hour/s</p>
                                <p>Season: {activity.season}</p>
                            </div>
                        )
                    })
                    }
                </span>
            </div>
            
        </div>
    )
}