import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import connectHesjes from '../screens/connectHesjes';

const Tabs = createBottomTabNavigator();

const MainBottomNav = () => (
    <Tabs.Navigator>
        <Tabs.Screen name="Hesjes" component={connectHesjes}/>
    </Tabs.Navigator>
);

export default () => {
    <NavigationContainer>
        <Tabs.Navigator>
            <Tabs.Screen name="Hesjes" component={connectHesjes}/>
        </Tabs.Navigator>
    </NavigationContainer>
}

