import React from 'react';
import connectHesjes from './screens/connectHesjes';
import connect from './screens/connect';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

export default class Example extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen name="Hesjes" component={connectHesjes} />
          <Tabs.Screen name="Hesjess" component={connect} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
}
