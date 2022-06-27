import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCountries, filterCountryByContinent, orderByName, orderByPopulation, getCountryByName } from "../../actions"
import { Link } from "react-router-dom"
import Countries from "../Countries/Countries"
import Pagination from "../Pagination/Pagination"
import NavBar from "../NavBar/NavBar"



export default function HomePage(){
    const dispatch = useDispatch() 
    const allCountries = useSelector(state => state.countries) //Me traigo mi state de countries del store
    const activities = useSelector(state => state.activities)
    const filteredCountries = useSelector(state => state.filteredCountries)

    const [order, setOrder] = useState("") //estado local para en handleOrder alfabetico
    const [filter, setFilter] = useState("All") //estado local para filtro de continentes
    

    
    //--Paginado--//
    const [currentPage, setCurrentPage] = useState(1) // Estado local con la pagina actual y la funcion para modificar esa pagina actual
    const [countriesPerPage, setCountriesPerPage] = useState(10) // Estado local de cantidad de paises por pagina y funcion para modificar ese estado
    const indexOfLastCountry = currentPage * countriesPerPage // en un inicio va a valer 10
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage // 0
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry) //corta el array de todos los paises desde el index del primer pais hasta el index del ultimo

    const pagination = (pageNumber) => { //Esta constante es la que me sirve para el renderizado
        setCurrentPage(pageNumber)
    }

    //console.log(allCountries)
    useEffect(() => { //Hook para usar las actions
        dispatch(getAllCountries())
    }, [])

    const handleFilterByContinent= (e) => {
        dispatch(filterCountryByContinent(e.target.value))
        setCurrentPage(1)
        setFilter(e.target.value)
    }

    const handleOrder = (e) => {
        e.preventDefault()
        if(e.target.value === "Asc" || e.target.value === "Desc"){
            dispatch(orderByName(e.target.value))
        }else{
            dispatch(orderByPopulation(e.target.value))
        }
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const onSearch = (name) => {
        dispatch(getCountryByName(name))
        setFilter("All")
    }


    return(
        <div>
            <h1>HOME</h1>
            <NavBar onSearch={onSearch}/>
            <select onChange={e => handleFilterByContinent(e)} value={filter}> {/*filtro por continentes*/}
                <option value="All">All continents</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Oceania">Oceania</option>
            </select>
            <select> {/*filtro de activities*/}
                {
                    activities?.map(activity => (
                        <option value={activity.name}>{activity.name}</option>
                    ))
                }
            </select>
            <select onChange={e => handleOrder(e)} value={order}> {/*ordenamiento alfabetico*/}
                <option value="Asc">A-Z</option>
                <option value="Desc">Z-A</option>
                <option value="Ascendente">Asc</option>
                <option value="Descendente">Desc</option>
            </select>
            <Link to="/activity">
                <button>Create your own activity!</button>
            </Link>
            <Pagination countriesPerPage={countriesPerPage} allCountries={filteredCountries.length} pagination={pagination} />
            <Countries allCountries={currentCountries}/>
            
        </div>
    )
}