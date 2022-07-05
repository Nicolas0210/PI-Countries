import React from "react"
import { Link } from 'react-router-dom'
import "./Country.css"

export default function Country({flag, name, continents, id}){
    
    return(
        <div className="card">
            <Link to={`/country/${id}`} className="link-container">
            <div key={id}>
                <img className="img-container" src={flag} alt={"Not found"}/>
                <div>
                    {
                        name.length > 20 ? <h1 className="name-container">{name.slice(0,20)}...</h1> : <h1 className="name-container">{name}</h1>
                    }
                    <h3 className="continent-container">{continents}</h3>
                </div>
            </div>
            </Link>
        </div>
    )
}