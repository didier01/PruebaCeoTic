import React from 'react';
import Movie from "../components/Movie";

import { Provider } from 'react-redux';
import generateStore from '../redux/Store';

const Home = () => {
    const store = generateStore();
    const ROUTE = 'Home';
    return (

        <Provider store={store}>
            <Movie ROUTE={ROUTE}/>
        </Provider>

    );
}

export default Home;