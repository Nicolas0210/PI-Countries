import React from 'react'
import { useState } from 'react'
import "./SearchBar.css"


export default function SearchBar({onSearch}){
    const [name, setName] = useState("")

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value) //value del input
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(name) //ese name es mi estado local en donde voy guardando lo que el usuario tipea
    }

    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    className="input-searchbar"
                    type="text"
                    placeholder="Search country..."
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit" className="button-searchbar">
                🔎
                </button>
            </form>
        </div>
    )
}