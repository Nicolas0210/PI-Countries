import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


export default function SearchBar({onSearch}){
    const dispatch = useDispatch()
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
                    type="text"
                    placeholder="Search country..."
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit">
                    Search
                </button>
            </form>
        </div>
    )
}