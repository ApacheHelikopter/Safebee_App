import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const SettingsTab = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Meldingen"
        onPress={() => navigation.navigate('Meldingen')}
      ></Button>
      <Button title="FAQ" onPress={() => navigation.navigate('FAQ')}></Button>
      <Button title="Help" onPress={() => navigation.navigate('Help')}></Button>
    </View>
  );
};

export default SettingsTab;
