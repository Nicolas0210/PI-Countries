import React from "react"
import Country from "../Country/Country"

export default function Countries({allCountries}){
    return(
        <div>
            <div>
                {
                    allCountries.map((country) => {
                        return <Country flag={country.flag} name={country.name} continents={country.continents} id={country.id}/>
                    })
                }
            </div>
        </div>
    )
}