import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, filterByName } from "../redux/reducers/MovieReducer";
import ItemMovie from "./ItemMovie";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Movie = ({ ROUTE }) => {

    const dispatch = useDispatch();
    const data = useSelector(store => store);
    const movies = data.movies.array;

    const [search, setSearch] = useState('');
    const [newMovies, setNewMovies] = useState([]);
    const [imgStorage, setImgStorage] = useState([]);



    useEffect(() => {
        dispatch(getMovies());
        getMoviesStorage();
        getImageStorage();
    }, []);

    const filterList = (text) => {
        dispatch(filterByName(text));
        setSearch(text)
    }

    const contains = ({ title }, query) => {
        if (title.includes(query)) {
            return true;
        }
        return false;
    };


    const addFavoriteStorage = async (dataJson) => {
        try {
            await AsyncStorage.setItem('movies', dataJson)
        } catch (error) {
            console.log('NO GUARDO EN STORAGE', error);
        }
    }

    const getMoviesStorage = async () => {
        try {
            const moviesStorage = await AsyncStorage.getItem('movies');
            if (moviesStorage) {
                setNewMovies(JSON.parse(moviesStorage));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const saveImageStorage = async (dataJson) => {
        try {
            await AsyncStorage.setItem('images', dataJson);
        } catch (error) {
            console.log('NO GUARDO EN STORAGE', error);
        }
    }

    const getImageStorage = async () => {
        try {
            const moviesStorage = await AsyncStorage.getItem('images');
            if (moviesStorage) {
                setImgStorage(JSON.parse(moviesStorage));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <View>
                <SearchBar
                    placeholder="Buscar ..."
                    onChangeText={(text) => filterList(text)}
                    value={search}
                    lightTheme='true'
                    inputContainerStyle={{ backgroundColor: '#fff', height: 40, width: '100%', padding: 0, margin: 0 }}
                    containerStyle={{ backgroundColor: 'transparent', padding: 0 }}
                />
            </View>
            <>
                <FlatList
                    style={styles.list}
                    data={movies}
                    keyExtractor={movies.id}
                    renderItem={({ item }) => < ItemMovie
                        movie={item}
                        addFavoriteStorage={addFavoriteStorage}
                        newMovies={newMovies}
                        setNewMovies={setNewMovies}
                        saveImageStorage={saveImageStorage}
                        setImgStorage={setImgStorage}
                        imgStorage={imgStorage}
                        ROUTE={ROUTE}
                    />}
                />
            </>
        </>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});

export default Movie;

