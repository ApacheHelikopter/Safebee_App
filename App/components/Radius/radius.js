import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';

const styles = StyleSheet.create({
  panel: {
    height: '100%',
    backgroundColor: '#f7f5eee8',
  },
  panelTitle: {
    alignSelf: 'center',
    fontSize: 27,
    height: 35,
  },
  sliderView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Radius = () => (
  <View style={styles.panel}>
    <Text style={styles.panelTitle}>Zone instellen</Text>
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
