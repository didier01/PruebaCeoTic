import axios from 'axios';

// Constants
const initialData = {
    array: []
}

// types
const GET_TREND_MOVIES = 'GET_TREND_MOVIES';
const GET_FAVORITES = 'GET_FAVORITES';
const FILTER_BY_NAME = 'FILTER_BY_NAME';

// Reducers
export default moviesReducer = (state = initialData, action) => {
    switch (action.type) {
        case GET_TREND_MOVIES:
            return { ...state, array: action.payload }
        case GET_FAVORITES:
            return { ...state, array: action.payload }
        case FILTER_BY_NAME:
            return { ...state, array: action.payload }
        default:
            return state;
    }
}

// Actions
export const getMovies = () => async (dispatch) => {
    try {
        const apiKey = 'api_key=f269218f9ac41fda847402ed563424ef';
        const url = `https://api.themoviedb.org/3/discover/movie?${apiKey}&sort_by=popularity.desc`;
        const res = await axios.get(url);
        dispatch({
            type: GET_FAVORITES,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error);
    }
}

export const getFavorites = (moviesFavorites) => async (dispatch) => {
    try {
        const movieFilter = [];
        const apiKey = 'api_key=f269218f9ac41fda847402ed563424ef';
        const url = `https://api.themoviedb.org/3/discover/movie?${apiKey}&sort_by=popularity.desc`;
        const res = await axios.get(url);

        const movies = res.data.results;
        movies.forEach(element => {
            moviesFavorites.forEach(ele => {
                if (element.id === ele) {
                    movieFilter.push(element);
                }
            })
        });
        dispatch({
            type: GET_TREND_MOVIES,
            payload: movieFilter
        })
    } catch (error) {
        console.log(error);
    }
}
export const filterByName = (query) => async (dispatch) => {
    try {
        const movieFilter = [];
        const apiKey = 'api_key=f269218f9ac41fda847402ed563424ef';
        const url = `https://api.themoviedb.org/3/discover/movie?${apiKey}&sort_by=popularity.desc`;
        const res = await axios.get(url);

        const movies = res.data.results;
       
        const filteredData = movies.filter(movie => {
            return contains(movie, query);
        });
        // setAllMovies(filteredData);
        
        dispatch({
            type: FILTER_BY_NAME,
            payload: filteredData
        })
    } catch (error) {
        console.log(error);
    }
}

const contains = ({ title }, query) => {
    if (title.includes(query)) {
        return true;
    }
    return false;
};

