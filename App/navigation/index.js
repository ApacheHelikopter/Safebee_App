import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import connectHesjes from '../screens/connectHesjes';
import connect from '../screens/connect';
import QRScanner from '../screens/QRScanner';
import SettingsTab from '../screens/settings';
import Meldingen from '../screens/meldingen';
import FAQ from '../screens/FAQ';
import Help from '../screens/help';
import Map from '../screens/Map';

const Tab = createBottomTabNavigator();

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsTab" component={SettingsTab} />
      <SettingsStack.Screen name="Meldingen" component={Meldingen} />
      <SettingsStack.Screen name="FAQ" component={FAQ} />
      <SettingsStack.Screen name="Help" component={Help} />
      <SettingsStack.Screen name="QRScanner" component={QRScanner} />
    </SettingsStack.Navigator>
  );
};

class TabNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{ showLabel: false }}>
          <Tab.Screen
            name="Home"
            component={Map}
            options={{
              tabBarIcon: () => <Icon name="location-on" size={30} />,
            }}
          />
          <Tab.Screen
            name="Profiel"
            component={connect}
            options={{ tabBarIcon: () => <Icon name="person" size={35} /> }}
          />
          <Tab.Screen
            name="Radius"
            component={connectHesjes}
            options={{
              tabBarIcon: () => <Icon name="my-location" size={30} />,
            }}
          />
          <Tab.Screen
            name="Instellingen"
            component={SettingsStackScreen}
            options={{
              tabBarIcon: () => (
                <MaterialIcon name="dots-horizontal" size={35} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default TabNavigator;
