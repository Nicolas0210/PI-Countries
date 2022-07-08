import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCountries, filterCountryByContinent, orderByName, orderByPopulation, getCountryByName, getActivities, filterCountryByActivities } from "../../actions"
import { Link } from "react-router-dom"
import Countries from "../Countries/Countries"
import Pagination from "../Pagination/Pagination"
import NavBar from "../NavBar/NavBar"
import "./HomePage.css"
import { ReactComponent as LoadingImg} from "../../assets/world-svgrepo-com.svg"
import { ReactComponent as BackToTopButton } from "../../assets/up-arrow-svgrepo-com.svg"
import { ReactComponent as NotFoundIcon } from "../../assets/not-found-icon.svg"




export default function HomePage(){
    const dispatch = useDispatch() 
    const allCountries = useSelector(state => state.allCountries) //Me traigo mi state de countries del store
    const activities = useSelector(state => state.activities)
    const filteredCountries = useSelector(state => state.filteredCountries)
    const [isLoading, setIsLoading] = useState(true)

    const [order, setOrder] = useState("") //estado local para en handleOrder alfabetico
    const [filterContinents, setFilterContinents] = useState("All") //estado local para filtro de continentes
    const [filterActivities, setFilterActivities] = useState("All-countries") //estado local para filtro de actividades

    //Back to top button//
    const [topButton, setTopButton] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () =>{ // addEventListener agrega el evento y espera que suceda, "scroll" es ese evento
            if(window.pageYOffset > 500){        // la cantidad de pixeles que escroleo hacia abajo
                setTopButton(true)
            }else{
                setTopButton(false)
            }
        }) 
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    

    
    //--Paginado--//
    const [currentPage, setCurrentPage] = useState(1) // Estado local con la pagina actual y la funcion para modificar esa pagina actual
    const [countriesPerPage, setCountriesPerPage] = useState(10) // Estado local de cantidad de paises por pagina y funcion para modificar ese estado
    const indexOfLastCountry = currentPage * countriesPerPage // en un inicio va a valer 10
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage // 0
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry) //corta el array de todos los paises desde el index del primer pais hasta el index del ultimo

    const pagination = (page) => { //Esta constante es la que me sirve para el renderizado
        setCurrentPage(page)
    }

    const nextPageButton = () => {
        setCurrentPage(currentPage + 1)
    }

    const prevPageButton = () => {
        setCurrentPage(currentPage - 1)
    }


    //console.log(allCountries)
    useEffect(() => { //Hook para usar las actions
        dispatch(getAllCountries())
        dispatch(getActivities())
    }, [])

    useEffect(() => {
        if(allCountries.length === 0){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }
    }, [allCountries])

    const handleFilterByContinent= (e) => { //filtrado por continentes
        dispatch(filterCountryByContinent(e.target.value))  //despacho la action al reducer
        setCurrentPage(1)                                   //seteo la pag en 1 para cuando aplique el filtro siempre arranque de la 1er pagina
        setFilterContinents(e.target.value)                           //seteo el filtro a lo que clickee el usuario
    }

    const handleFilterByActivities = (e) => {
        dispatch(filterCountryByActivities(e.target.value))
        setCurrentPage(1)
        setFilterActivities(e.target.value)
    }

    const handleOrder = (e) => { //ordenamiento alfabetico y por poblacion (Estan en el mismo select)
        e.preventDefault()
        if(e.target.value === "Asc" || e.target.value === "Desc"){  //Si el click es en "Asc" o "Desc"
            dispatch(orderByName(e.target.value))                   //se aplica esta action
        }else{  
            dispatch(orderByPopulation(e.target.value))             //si el click es para poblacion se aplcia la action de poblacion
        }
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    const onSearch = (name) => {
        dispatch(getCountryByName(name))
        setFilterContinents("All")
        const idSearchBar = document.getElementById("input-searchbar") //Esto es para 
        idSearchBar.value = ""                                         //limpiar el input de la search bar despues del submit
        setOrder("")
        setCurrentPage(1)
    }


    return(
        <div className="home-container">
            <div className="nav-container">
                <NavBar onSearch={onSearch}/>
                <button onClick={(e) => onSearch("")} className="reset-button">Reset</button>
                
                <Link to="/activity" className="create-button">
                <button className="create-button2">Create your own activity!</button>
                </Link>
            </div>
            <div className="filters-container">
                <select onChange={e => handleFilterByContinent(e)} value={filterContinents} className="filter-continents"> {/*filtro por continentes*/}
                    <option value="All">All continents</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <select onChange={e => handleFilterByActivities(e)} value={filterActivities} className="filter-activities"> {/*filtro de activities*/}
                <option disabled selected>Filter by activity</option>
                <option value="All-countries">-All countries-</option>
                    {
                        activities?.map(activity => (
                            <option value={activity.name} key={activity.name}>{activity.name}</option>
                        ))
                    }
                </select>
                <select onChange={e => handleOrder(e)} value={order} className="order-filter"> {/*ordenamiento alfabetico y por poblacion*/}
                    <option value="Asc">A-Z</option>
                    <option value="Desc">Z-A</option>
                    <option value="Ascendente">Most population</option>
                    <option value="Descendente">Less population</option>
                </select>
            </div>
            <Pagination 
                countriesPerPage={countriesPerPage} 
                allCountries={filteredCountries.length} 
                pagination={pagination} 
                nextPageButton={nextPageButton}
                prevPageButton={prevPageButton}
                currentPage={currentPage}/>
            {
                isLoading ? 
                <div className="loading-container">
                    <LoadingImg className="loading-img"/>
                </div> : filteredCountries.length ?
                <Countries allCountries={currentCountries}/> :
                <div className="not-found-icon-cont">
                <NotFoundIcon className="not-found-icon"/>
                <p className="not-found-text">{"Whoops! Seems like that country is not from this planet!"}</p>
                </div>
            }

            {
                topButton && (
                    <BackToTopButton onClick={(e) => scrollToTop(e)} className="back-to-top"/>
                )
            }
        </div>
    )
}