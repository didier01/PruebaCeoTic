import { StyleSheet } from 'react-native';
// import { DefaultTheme } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    }
}

const globalStyle = StyleSheet.create({
    btnMovieHome: {
        marginVertical: 8,
        padding: 8,
        marginHorizontal: 20
    },
    txtMovieHome: {
        color: theme.colors.primary,
        textAlign: 'justify',
        fontWeight: 'bold',
        fontSize: 16
    },
    list: {
        flex: 1,
        marginHorizontal: '2.5%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',    
        margin: '2.5%'
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderColor: '#e7e7e7',
        borderWidth: 1,
        borderRadius: 5
    },
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: '2.5%',
    },
    btnCamera: {
        width: 60,
        backgroundColor: 'transparent',
        color: 'transparent',
        top: 120,
        right: 30
    }
});

export default globalStyle;