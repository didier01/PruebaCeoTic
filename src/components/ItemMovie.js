import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import globalStyles from "../../styles/GlogalStyles";

const ItemMovie = ({ movie, addFavoriteStorage, newMovies, setNewMovies, ROUTE, deleteFavorites, 
    saveImageStorage, setImgStorage, imgStorage }) => {
  
    const downloadImage = (data) => {
        const urlImage = `http://image.tmdb.org/t/p/original${data}`;
        let dirs = RNFetchBlob.fs.dirs
        RNFetchBlob
            .config({
                fileCache: true,
                appendExt: 'jpg',
                addAndroidDownloads: {
                    //Related to the Android only
                    useDownloadManager: true,
                    notification: true,
                    path: dirs.PictureDir + '/images',
                    description: 'Image',
                },
            })
            .fetch('GET', urlImage)
            .then((res) => {
                saveImg(urlImage)
                // console.log('respuesta', JSON.stringify(res));
                alert('La imagen se descargó correctamente.');
            });

    }

    const addToFavorites = (id) => {
        if (newMovies.includes(id)) {
            return;
        }
        const moreMovies = [...newMovies, id];
        setNewMovies(moreMovies);
        // // storage citas
        addFavoriteStorage(JSON.stringify(moreMovies));
    }

    const saveImg = (imgUrl) => {
        if (imgStorage.includes(imgUrl)) {
            return;
        }
        const moreImages = [...imgStorage, imgUrl];
        setImgStorage(moreImages);
        // // storage citas
        saveImageStorage(JSON.stringify(moreImages));
    }

    

    const RowHome = () => {
        if (ROUTE == 'Favorites') {
            return (
                <View style={styles.row}>
                    <View>
                        <TouchableHighlight onPress={() => deleteFavorites(movie.id)} style={globalStyles.btnMovieHome}>
                            <Text style={globalStyles.txtMovieHome}>Quitar de favoritos </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.row}>
                    <View>
                        <TouchableHighlight onPress={() => addToFavorites(movie.id)} style={globalStyles.btnMovieHome}>
                            <Text style={globalStyles.txtMovieHome}>Agregar a favoritos </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => downloadImage(movie.backdrop_path)} style={globalStyles.btnMovieHome}>
                            <Text style={globalStyles.txtMovieHome}>Descargar</Text>
                        </TouchableHighlight>
                    </View>

                </View>
            );
        }

    }

    return (

        <View style={styles.movie}>
            <View>
                <Image
                    style={{ width: '100%', height: 250 }}
                    source={{ uri: `http://image.tmdb.org/t/p/original${movie.backdrop_path}` }}
                />
            </View>
            <View>
                <Text style={styles.label}>{movie.title}</Text>
                <Text style={styles.texto}>{movie.overview}</Text>
            </View>
            <RowHome />
        </View>
    );
}

const styles = StyleSheet.create({
    movie: {
        backgroundColor: '#fff',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row'
    },
    texto: {
        textAlign: 'justify'
    }
});

export default ItemMovie;