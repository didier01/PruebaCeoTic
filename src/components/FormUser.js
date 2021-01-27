import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Keyboard, TouchableWithoutFeedback,
    TextInput, Platform, FlatList, Text
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Image } from 'react-native-elements';

import globalStyles from "../../styles/GlogalStyles";
import { DefaultTheme } from '@react-navigation/native';

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType, AVEncodingOption, AudioEncoderAndroidType,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import AsyncStorage from '@react-native-async-storage/async-storage';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    }
}

const FormUser = () => {

    const audioRecorderPlayer = new AudioRecorderPlayer();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('/assetts/no_image.jpg');
    const [audios, setAudios] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        
    });

    const path = Platform.select({
        ios: 'hello.m4a',
        // android: 'sdcard/hello.mp4', // should give extra dir name in android. Won't grant permission to the first level of dir.
        android: `sdcard/prueba${count}.mp4`,
    });

    // const saveAudioStorage = async (dataJson) => {
    //     try {
    //         await AsyncStorage.setItem('audios', dataJson);
    //     } catch (error) {
    //         console.log('NO GUARDO EN STORAGE', error);
    //     }
    // }

    // const getAudioStorage = async () => {
    //     try {
    //         const storage = await AsyncStorage.getItem('audios');
    //         if (moviesStorage) {
    //             setAudios(JSON.parse(storage));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const closeKeyBoard = () => {
        Keyboard.dismiss();
    }
    const openPhoto = (id) => {
        switch (id) {
            case 0:
                launchImageLibrary({ mediaType: 'photo' }, (res) => {
                    if (res.uri) {
                        setImage(res.uri);
                    }
                });
                break;
            case 1:
                launchCamera(DEFAULT_OPTIONS, (res) => {
                    // setImage(res.uri);
                    console.log(res);
                });
                break;

            default:
                break;
        }

    }
    
    const onStartRecord = async () => {
        // const path = `sdcard/hello${count}.mp4`;
        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        console.log('audioSet', audioSet);
        const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
        audioRecorderPlayer.addRecordBackListener((e) => {
            // setRecordSecs(e.current_position);
            // setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
            return;
        });
        console.log(`uri: ${uri}`);

    };
    
    const onStopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        // console.log(result);
        const res = result.slice(8);
        console.log('palabar', res);
        const newMore = [...audios, res]
        setAudios(newMore);
        // saveAudioStorage(JSON.stringify(newMore))
        setCount(count + 1);
        console.log('audios', audios);
    }

    const onStartPlay = async (item) => {
        const msg = await audioRecorderPlayer.startPlayer(item);
        audioRecorderPlayer.setVolume(1.0);
        audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.current_position === e.duration) {
                audioRecorderPlayer.stopPlayer();
            }
            return;
        });
    };

    const onStopPlay = async () => {
        console.log('onStopPlay');
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    };

    const deleteFavorites = (data) => {
        const filterAudios = audios.filter(item => item !== data);
        setAudios(filterAudios);       
    }

    return (
        <TouchableWithoutFeedback onPress={() => closeKeyBoard()} >
            <View style={globalStyles.container}>
                <View style={{
                    width: '100%', flexDirection: 'row', justifyContent: 'center',
                    marginBottom: 20, left: 20
                }}>
                    <Image
                        source={{ uri: image }}
                        style={{ width: 150, height: 150, borderRadius: 100 }}
                    />
                    <Button
                        title=''
                        containerStyle={globalStyles.btnCamera}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        icon={
                            <Icon name='camera' color={theme.colors.primary} size={20} />
                        }
                        onPress={() => openPhoto(0)}
                    />
                </View>
                <TextInput
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder='Nombre'
                    style={globalStyles.input}
                />
                <TextInput
                    onChangeText={text => setPhone(text)}
                    value={phone}
                    placeholder='Teléfono'
                    keyboardType='numeric'
                    style={globalStyles.input}
                />
                <TextInput
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder='Email'
                    style={globalStyles.input}
                />

                <View style={{ width: '100%', justifyContent: 'center' }}>

                    <Button title='Grabar'
                        buttonStyle={styles.btnAudio}
                        icon='pencil-circle'
                        onPress={() => onStartRecord()}
                    />
                    <Button title='Detener'
                        buttonStyle={styles.btnAudio}
                        icon='pencil-circle'
                        onPress={() => onStopRecord()}
                    />
                </View>
                <>
                    <FlatList
                        data={audios}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginLeft: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Button
                                        title=''
                                        buttonStyle={{ backgroundColor: 'transparent' }}
                                        icon={<Icon name='play' color={theme.colors.primary} size={20} />}
                                        onPress={() => onStartPlay(item)}
                                    />
                                    <Text style={styles.txt}>Audio {index + 1}</Text>
                                </View>

                                <Button
                                    title=''
                                    buttonStyle={{ backgroundColor: 'transparent' }}
                                    icon={<Icon name='trash' color={theme.colors.primary} size={20} />}
                                    onPress={() => deleteFavorites(item)}
                                />
                            </View>
                        )}
                    />
                </>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    btnAudio: {
        width: '60%',
        alignSelf: 'center',
        marginBottom: 10
    },
    txt: {
        alignSelf: 'center'
    }
});

export default FormUser;