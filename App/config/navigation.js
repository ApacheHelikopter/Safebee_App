import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import connectHesjes from '../screens/connectHesjes';

const MenuStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const MainBottomNav = () => (
    <Tabs.Navigator>
        <Tabs.Screen name="Hesjes" component={connectHesjes}/>
    </Tabs.Navigator>
);

export default () => {
    <NavigationContainer>
        <MainBottomNav />
    </NavigationContainer>
}

