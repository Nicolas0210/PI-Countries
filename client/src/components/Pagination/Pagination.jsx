import React from 'react'
import "./Pagination.css"

export default function Pagination ({countriesPerPage, allCountries, pagination, nextPageButton, prevPageButton, currentPage}){ //Le paso las props del componente Home
    const pageNumber = Math.ceil(allCountries/countriesPerPage) || 1 // si el mathceil me da 0 (osea un valor false) va al 1 
                                                                     // y si divuelve un valor true vale lo que de el mathceil 


    return (
        <nav>
            <ul className="pagination">
                <div className="page-buttons-container">
                    <button onClick={(e) => pagination(1)} disabled={currentPage === 1} className="pagination-button">First</button>
                    <button onClick={(e) => prevPageButton(e)} disabled={currentPage === 1} className="pagination-button">{"<<Prev"}</button>
                    <p className="page-number">{currentPage}</p>
                    <button onClick={(e) => nextPageButton(e)} disabled={currentPage === pageNumber} className="pagination-button">{"Next>>"}</button> 
                    <button onClick={(e) => pagination(pageNumber)} disabled={currentPage === pageNumber} className="pagination-button">Last</button>       
                </div>
            </ul>
        </nav>
    )
}