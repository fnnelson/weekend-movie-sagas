import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DetailsPage() {

    const feature = useSelector(store => store.movieDetail)

    return (
        <main>
            <Link to='/'>
                <button>Back To List</button>
            </Link>
            <h1>Movie Details</h1>
            <h3>{feature.title}</h3>
            <img src={feature.poster} alt={feature.title} />
            <p>{feature.description}</p>
            <h3>Genres:</h3>
        </main>
    )

}

export default DetailsPage