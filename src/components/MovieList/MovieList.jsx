import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    const goToDetails = (flick) => {
        console.log("clicked a movie:", flick)
        // intend to add latest movie clicked onto a global state for the details page to pull that info in
        dispatch({ type: 'CLICKED_MOVIE', payload: flick })
        // note - this is a slight workaround from the GET_GENRES dispatch not being done by the time we move to /details.  I think a better way could be done, though need to tinker around with where and when the calls are being made to be in order.
        setTimeout(() => { history.push('/details') }, 100)
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={() => goToDetails(movie)} />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;