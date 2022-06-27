import React, { useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import {Link} from 'react-router-dom'


export default function NavBar({onSearch}){
    return(
        <div>
            <SearchBar onSearch={onSearch}/>
        </div>
    )
}