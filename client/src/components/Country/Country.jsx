import React from "react"
import { Link } from 'react-router-dom'

export default function Country({flag, name, continents, id}){
    
    return(
        <Link to={`/country/${id}`}>
        <div key={id}>
            <img src={flag} alt={"Not found"}/>
            <div>
                <h1>{name}</h1>
                <h3>{continents}</h3>
            </div>
        </div>
        </Link>
    )
}