import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getDetailedCountry, deleteActivity, cleanCountryDetails } from '../../actions'
import { Link } from 'react-router-dom'
import "./CountryDetails.css"
import { ReactComponent as HomeButton} from "../../assets/home-button.svg"


export default function CountryDetails(props){
    const dispatch = useDispatch()
    const {id} = useParams()
    const country = useSelector(state => state.countryDetails)
    const countryName = country.name
   
    const handleDeleteActivity = (e) => {
        console.log("first")
      
        dispatch(deleteActivity(countryName, e.target.id))
        dispatch(getDetailedCountry(id))
    }

    useEffect(() => {
        dispatch(getDetailedCountry(id))
        return () => {
            dispatch(cleanCountryDetails())
        }
    },[])

    
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
                                        <button id={activity.name} onClick={(e) => handleDeleteActivity(e)} className="delete-act-button">x</button>
                                        <h1>Activity to do:</h1>
                                        <p id={activity.name}>Name: {activity.name}</p>
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
                        
            
                        
                            
                            
            
            
                
            
                