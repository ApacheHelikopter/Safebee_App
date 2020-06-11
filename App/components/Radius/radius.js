import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';

const styles = StyleSheet.create({
  panel: {
    height: '100%',
  },
  panelTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    height: 35,
    color: '#ffffff',
  },
  sliderView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff90',
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 2,
    height: 50,
  },
});

const Radius = () => (
  <View style={styles.panel}>
    <Text style={styles.panelTitle}>zone instellen</Text>
    <View style={styles.sliderView}>
      <Slider
        style={{ width: 300 }}
        step={5}
        minimumValue={1}
        maximumValue={200}
        value={100}
      />
    </View>
  </View>
);

export default Radius;
