import { combineReducers, createStore,  applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import moviesReducer from "./reducers/MovieReducer";

const rootReducer = combineReducers({
    movies: moviesReducer,
});

export default generateStore = () => {
    const store =  createStore(rootReducer, applyMiddleware(thunkMiddleware));
    return store;   
};