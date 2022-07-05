import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postActivity } from '../../actions/index'
import { ReactComponent as HomeButton} from "../../assets/home-button.svg"
import "./CreateActivity.css"


export default function CreateActivity(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countries = useSelector(state => state.countries)   //traigo countries de mi store
    const [errors, setErrors] = useState({first: true})


    const [input, setInput] = useState({ //defino un estado local el cual sirve para guardar los datos ingresados por el usuario y mando al back
        name: "",
        duration: "",
        season: "",
        countries: []
    })

    const handleDeleteCountry = (e) => {
        e.preventDefault()
        const newCountries = input.countries.filter(country => {
            return country !== e.target.value // e.target.value es lo que esta dentro del tag
        })
        setInput({
            ...input,
            countries: newCountries
        })
        setErrors(validations({
            ...input,
            countries: newCountries
        }))
    }
    

    const handleChange = (e) => {
        e.preventDefault()
        setInput({                           //funcion para modificar mi estado local "input". Cuando haya algun cambio en el input...
            ...input,                        //guardame lo que ya habia +
            [e.target.name]: e.target.value   //el nuevo dato que haya ingresado. ese [e.target.name] es cada name de cada input que yo hice abajo
        })
        setErrors(validations({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectCountries = (e) => { //esta funcion es para que se pueda elegir mas de un pais
        setInput({
            ...input,                                       //guarda lo que ya habia
            countries: [...input.countries, e.target.value] //y concatena lo que ya habia en el array + el pais nuevo
        })
        setErrors(validations({
            ...input,
            countries: [...input.countries, e.target.value]
        }))
    }

    const handleCheck = (e) => {
        if(e.target.id === input[e.target.name]){ // esto significa que el usuario clickeo 2 veces el mismo radio(checkbox)

            const currentRadio = document.getElementById(e.target.id) 
            currentRadio.checked = false

            setInput({
                ...input,
                [e.target.name]: null
            })
        }
        //console.log("entre al handleCheck")
        else{
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postActivity(input))
        alert("Your activity has been created successfully!")
        setInput({
            name: "",
            dificulty: 0,
            duration: "",
            season: "",
            country: []
        })
        navigate("/home")
    }   

    //Validaciones//
    const validations = (input) => {
        let errors = {}
        if(!input.name){
            errors.name = "-Activity name required-"
        }
        else if(input.name?.trim().length < 2){ //el .trim() saca los espacios del inicio y el fin de la palabra (es para que no se pueda crear una actividad con el name de puros espacios)
            errors.name = "-Activity name must be at least 2 characters"
        }
        else if((/[^a-zA-Z0-9 ]/.test(input.name))){ //validacion para que el name no pueda contener caracteres especiales
            errors.name = "-Activity name cannot contain special characters-"
        }
        if(!input.countries?.length){
            errors.country = "-Select at least one country where u can practice your activity- "
        }
        return errors
    }


    return(
        <div>
            <Link to="/home">
                <button className="button-home2"><HomeButton className="button-component2"/></button>
            </Link>
            <div className="form-container">
                
                    <h1 className="creation-title-container">Activity Creation</h1>
                
                <form onSubmit={(e) => handleSubmit(e)} className="creation-form">
                    <div>
                        <label>Activity Name: </label>
                        <input onChange={(e) => handleChange(e)} type="text" value={input.name} name="name" className="input-name"/>
                        {!errors.name ? null : <span className="error-name-alert">{errors.name}</span>}

                    </div>
                    <div>
                        <p>Activity dificulty </p>
                        <input onClick={(e) => handleCheck(e)} type="radio" value={1} id="1" name="dificulty"/>
                        <label htmlFor="1"> 1 </label>
                        <input onClick={(e) => handleCheck(e)} type="radio" value={2} id="2" name="dificulty"/>
                        <label htmlFor="2"> 2 </label>
                        <input onClick={(e) => handleCheck(e)} type="radio" value={3} id="3" name="dificulty"/>
                        <label htmlFor="3"> 3 </label>
                        <input onClick={(e) => handleCheck(e)} type="radio" value={4} id="4" name="dificulty"/>
                        <label htmlFor="4"> 4 </label>
                        <input onClick={(e) => handleCheck(e)} type="radio" value={5} id="5" name="dificulty"/>
                        <label htmlFor="5"> 5 </label>
                    </div>
                    <div>
                        <label>Activity duration </label>
                        <input onChange={(e) => handleChange(e)} type="time" id="timer" value={input.duration} name="duration" className="input-timer"/>
                    </div>
                    <div>
                        <p>Select your activity season </p>
                        <input onClick={(e) => handleCheck(e)} type="radio" value="summer" id="summer" name="season"/>
                        <label htmlFor="summer">Summer </label>
                        <input onClick={(e) => handleCheck(e)} type="radio" value="spring" id="spring" name="season"/>
                        <label htmlFor="spring">Spring </label>
                        <input onClick={(e) => handleCheck(e)} type="radio" value="fall" id="fall" name="season"/>
                        <label htmlFor="fall">Fall </label>
                        <input onClick={(e) => handleCheck(e)} type="radio" value="winter" id="winter" name="season"/>
                        <label htmlFor="winter">Winter </label>
                    </div>
                    <div>
                        <p>Where do you want to practice this activity?</p>
                        <select onChange={handleSelectCountries} value="place-holder" className="country-select">
                            <option selected disabled value="place-holder">-Select one or more countries-</option>
                            {countries.map(country => {
                                if(!input.countries.includes(country.name)){
                                    return <option id={country.name} value={country.name}>{country.name}</option>
                                }
                            })}
                        </select>
                            <ul>{input.countries.map(country => <li>{country}<button value={country} onClick={(e) => handleDeleteCountry(e)} className="delete-act-button"> x</button></li>)}</ul>
                            {!errors.country ? null : <p className="error-country-alert">{errors.country}</p>}
                    </div>
                    <div className="button-create-container">
                        {!Object.keys(errors).length ? <button type="submit" className="act-creation-button">Create activity</button> : <button type="submit" disabled={true} className="act-creation-button">Create activity</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}
                            
                            
                            
                        

// {countries.map(country => {
//     if(input.countries.includes(country.name)){
//         return;
//     }else{
//         return <option id={country.name} value={country.name}>{country.name}</option>
//     }
// })}
