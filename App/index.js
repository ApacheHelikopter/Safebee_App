import React from 'react';
import SafebeeApp from './navigation/index';
import { NavigationContainer } from '@react-navigation/native';

export default class Safebee extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <SafebeeApp />
      </NavigationContainer>
    );
  }
}
