import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getDetailedCountry } from '../../actions'
import { Link } from 'react-router-dom'
import "./CountryDetails.css"
import { ReactComponent as HomeButton} from "../../assets/home-button.svg"


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
            <Link to="/home">
                <button className="button-home"><HomeButton className="button-component"/></button>
            </Link>
            
            <div className="img-position">
                <img src={country.flag} alt="img not found" className="img-container2"/>
            </div>
            <div className="all-container">
                <div className="data-container">
                    <h1>Name: {country.name}</h1>
                    <p>Code: {country.id}</p>
                    <p>Continent: {country.continents}</p>
                    <p>Capital: {country.capital? country.capital : "None"}</p>
                    <p>Sub-region: {country.sub_region? country.sub_region : "None"}</p>
                    <p>Area: {country.area} km²</p>
                    <p>Population: {country.population}</p>
                </div>
            </div>
                    {country.touristActivities?.length ?
                        (<div className="activity-container">
                            {country.touristActivities?.map((activity) => {
                                return(
                                    <div>
                                        <h1>Activity to do:</h1>
                                        <p>Name: {activity.name}</p>
                                        {activity.dificulty && <p>Dificulty: {activity.dificulty}</p>}
                                        <p>Duration: {activity.duration} hour/s</p>
                                        {activity.season && <p>Season: {activity.season.charAt(0).toUpperCase() + activity.season.slice(1)}</p>}
                                    </div>
                                )
                            })}
                        </div>) : null
                    }
        </div>
    )
}
                        
            
                        
                            
                            
            
            
                
            
                