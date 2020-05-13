import React from 'react';
import SafebeeApp from './navigation/index';
import { NavigationContainer } from '@react-navigation/native';
import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default class Safebee extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <SafebeeApp />
      </NavigationContainer>
    );
  }
}
