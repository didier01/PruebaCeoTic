import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../../styles/GlogalStyles'

const Download = () => {

    const [img, setImg] = useState('');
    const [images, setImages] = useState([]);
    const [refreshing, setRefreshing] = useState(false); 

    useEffect(() => {
        getImagesStorage()
    }, [refreshing]);

    const getImg = () => {
        let dirs = RNFetchBlob.fs.dirs;
        const PATH_TO_READ = `${dirs.PictureDir}/images`;

        console.log('DESCARGAS', PATH_TO_READ);
        // RNFetchBlob.fs.readFile(PATH_TO_READ, 'utf8')
        //     .then((data) => {
        //         // handle the data ..
        //         console.log('PATH TO READ', data);
        //         // setImg(data.streamId);
        //     });
    }

    const getImagesStorage = async () => {
        try {
            const imagesStorage = await AsyncStorage.getItem('images');
            if (imagesStorage) {
                setImages(JSON.parse(imagesStorage));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            // getImagesStorage();
            setRefreshing(false)
        }, 1000);
    };

    return (
        <>
            <Text style={globalStyles.title}>Imagenes descargadas</Text>
            <>
                <FlatList
                    style={globalStyles.list}
                    data={images.reverse()}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    renderItem={({ item }) => {
                        return (
                            <Image
                                style={{ width: '100%', height: 250, marginBottom: 15 }}
                                source={{ uri: item }} />
                        );
                    }}
                />
            </>
        </>

    );
}

export default Download;