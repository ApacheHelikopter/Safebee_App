import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const Meldingen = () => {
  return (
    <View style={styles.viewContainer}>
      <Text>Hallo! Kom later terug, dit hoort nu nog niet bij de demo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default Meldingen;
