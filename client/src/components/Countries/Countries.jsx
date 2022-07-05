import React from "react"
import Country from "../Country/Country"
import "./Countries.css"

export default function Countries({allCountries}){
    return(
        <div>
            <div className="card-container">
                {
                    allCountries.map((country) => {
                        return <Country flag={country.flag} name={country.name} continents={country.continents} id={country.id} key={country.name}/>
                    })
                }
            </div>
        </div>
    )
}