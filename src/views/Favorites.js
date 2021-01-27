import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFavorites } from "../redux/reducers/MovieReducer";
import { Provider } from 'react-redux';
import generateStore from '../redux/Store';
import ItemMovie from "../components/ItemMovie";

const Favorites = () => {

    const store = generateStore();
    const dispatch = useDispatch();
    const data = useSelector(store => store);
    const movies = data.movies.array;

    const [storageMovies, setStorageMovies] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const ROUTE = 'Favorites';

    useEffect(() => {
        
        getMoviesStorage();
    }, []);

    const getMoviesStorage = async () => {
        try {
            const moviesStorage = await AsyncStorage.getItem('movies');
            if (moviesStorage) {
                setStorageMovies(JSON.parse(moviesStorage));
                dispatch(getFavorites(JSON.parse(moviesStorage)));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Eliminar pacientes
    const deleteFavorites = id => {
        const filterMovies = storageMovies.filter(item => item !== id);
        setStorageMovies(filterMovies);
        saveStorage(JSON.stringify(filterMovies));
        getMoviesStorage()
    }

    const saveStorage = async (dataJson) => {
        try {
            await AsyncStorage.setItem('movies', dataJson)
        } catch (error) {
            console.log('NO GUARDO EN STORAGE', error);
        }
    }
    
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            getMoviesStorage();
            setRefreshing(false)
        }, 1500);
    };



    return (
        <Provider store={store}>
            <>
                <FlatList
                    style={styles.list}
                    data={movies.reverse()}
                    keyExtractor={movies.id}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({ item }) => < ItemMovie
                        movie={item}
                        ROUTE={ROUTE}
                        deleteFavorites={deleteFavorites}
                    />}
                />
            </>

        </Provider>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});

export default Favorites;