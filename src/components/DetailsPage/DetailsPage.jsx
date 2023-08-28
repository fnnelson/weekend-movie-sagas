import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DetailsPage() {


    const feature = useSelector(store => store.movieDetail)

    console.log("genres from store:", feature.genres)
    console.log("features object is:", feature)

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
            <div>
                {feature.genres.map((genre, index) => (
                    <div key={index}>
                        <p>{genre.name}</p>
                    </div>
                ))}
            </div>
        </main>
    )

}

export default DetailsPage