
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './src/views/Home';
import Settings from './src/views/Settings';
import Favorites from './src/views/Favorites';
import Download from './src/views/Download';

import { Provider } from 'react-redux';
import generateStore from './src/redux/Store';


const Tab = createBottomTabNavigator();

const App = () => {

  const store = generateStore();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    }
  }

  const HomeStack = createStackNavigator();
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home}
          options={{
            title: 'Películas',
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: '#fff'
          }} />
        <HomeStack.Screen name="Favorites" component={Favorites} />
        <HomeStack.Screen name="Download" component={Download} />
        <HomeStack.Screen name="Settings" component={Settings} />
      </HomeStack.Navigator>
    );
  }

  const SettingsStack = createStackNavigator();
  function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={Settings} options={{
          title: 'Perfil',
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: '#fff'
        }} />
        <SettingsStack.Screen name="Home" component={Home} />
        <SettingsStack.Screen name="Favorites" component={Favorites} />
        <SettingsStack.Screen name="Download" component={Download} />
      </SettingsStack.Navigator>
    );
  }

  const DownloadStack = createStackNavigator();
  function DownloadStackScreen() {
    return (
      <DownloadStack.Navigator>
        <DownloadStack.Screen name="Download" component={Download} options={{
          title: 'Descargas',
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: '#fff'
        }} />
        <DownloadStack.Screen name="Settings" component={Settings} />
        <DownloadStack.Screen name="Home" component={Home} />
        <DownloadStack.Screen name="Favorites" component={Favorites} />
      </DownloadStack.Navigator>
    );
  }

  const FavoritesStack = createStackNavigator();
  function FavoritesStackScreen() {
    return (
      <FavoritesStack.Navigator>
        <FavoritesStack.Screen name="Favorites" component={Favorites} options={{
          title: 'Favoritos',
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: '#fff'
        }} />
        <FavoritesStack.Screen name="Download" component={Download} />
        <FavoritesStack.Screen name="Settings" component={Settings} />
        <FavoritesStack.Screen name="Home" component={Home} />
      </FavoritesStack.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Home'
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavoritesStackScreen}
            options={{
              tabBarLabel: 'Favoritos',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="star" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Download"
            component={DownloadStackScreen}
            options={{
              tabBarLabel: 'Descargas',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="download" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsStackScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),

            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};



export default App;
