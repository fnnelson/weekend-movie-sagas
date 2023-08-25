import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeLatest('CLICKED_MOVIE', getMovieClicked)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.error('get all error');
    }
}

function* getMovieClicked(action) {
    // requesting specific movie and its genres from the DB
    try {
        const movieId = action.payload.id
        console.log("movie to be updated for now showing:", action.payload, "and its ID:", movieId)
        const clickedMovie = yield axios.get(`/api/genre/${movieId}`)
        yield put({ type: 'NOW_SHOWING', payload: action.payload })
        yield put({ type: 'GET_GENRES', payload: clickedMovie.data })
    } catch {
        console.error('get clicked movie error')
    }
}

// reducer used to update to the latest clicked movie, so its details can be used on the MovieDetails page
const movieDetail = (state = {}, action) => {
    switch (action.type) {
        case 'NOW_SHOWING':
            return action.payload;
        case 'GET_GENRES':
            return {...state, genres: action.payload};
        default:
            return state;
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetail
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
