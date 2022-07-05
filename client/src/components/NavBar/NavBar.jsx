import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import "./NavBar.css"


export default function NavBar({onSearch}){
    return(
        <div className="nav-container">
            <SearchBar onSearch={onSearch}/>
        </div>
    )
}