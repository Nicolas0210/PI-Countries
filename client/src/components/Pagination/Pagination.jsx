import React from 'react'

export default function Pagination ({countriesPerPage, allCountries, pagination}){ //Le paso las props del componente Home
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){ //El Math.ceil me redondea para arriba el result del la division entre allCountries / countriesPerPage
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {
                    pageNumbers &&
                    pageNumbers.map(number => ( //Si en mi pageNumbers hay algo entonces hago este map
                        <li className="pageNumber" key={number}>
                            <a onClick={() => pagination(number)}>{number}</a> {/*Ejecuto la funcion pasandole cada numero de pagina*/}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}