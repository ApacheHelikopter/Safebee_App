import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import connectHesjes from '../screens/connectHesjes';
import connect from '../screens/connect';
import QRScanner from '../screens/QRScanner';

//Map imports
import Map from '../screens/map';
import GeoLocationMap from '../screens/map2';

//Settings imports
import SettingsTab from '../screens/Settings/settings';
import FAQ from '../screens/Settings/FAQ';
import Help from '../screens/Settings/help';
import Meldingen from '../screens/meldingen';

//Profiel imports
import ProfielTab from '../screens/Profile/profile';
import MijnGroepen from '../screens/Profile/mijnGroepen';
import ConnectHesje from '../screens/Profile/connectHesje';
import DisconnectHesje from '../screens/Profile/disconnectHesje';

//Radius imports
import Radius from '../screens/Radius/radiusSheet';

const Tab = createBottomTabNavigator();

const SettingsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsTab"
        component={SettingsTab}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#F6C004',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <SettingsStack.Screen name="Meldingen" component={Meldingen} />
      <SettingsStack.Screen name="FAQ" component={FAQ} />
      <SettingsStack.Screen name="Help" component={Help} />
      <SettingsStack.Screen name="QRScanner" component={QRScanner} />
    </SettingsStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfielTab"
        component={ProfielTab}
        options={{
          title: 'Profiel',
          headerStyle: {
            backgroundColor: '#F6C004',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen name="Groepen" component={MijnGroepen} />
      <ProfileStack.Screen name="ConnectHesje" component={ConnectHesje} />
      <ProfileStack.Screen name="DisconnectHesje" component={DisconnectHesje} />
    </ProfileStack.Navigator>
  );
};

class TabNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            activeTintColor: '#F6C004',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen
            name="Home"
            component={GeoLocationMap}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="location-on" size={30} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profiel"
            component={ProfileStackScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="person" size={35} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Radius"
            component={Radius}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="my-location" size={30} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Instellingen"
            component={SettingsStackScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialIcon name="dots-horizontal" size={35} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default TabNavigator;
