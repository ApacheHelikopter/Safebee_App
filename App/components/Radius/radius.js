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
  track: {
    height: 20,
  },
  sliderWidth: {
    padding: 20,
  },
});

const Radius = () => (
  <View style={styles.panel}>
    <Text style={styles.panelTitle}></Text>
    <View style={styles.sliderView}>
      <View style={styles.sliderWidth}>
        <Slider
          style={{ width: 270 }}
          step={5}
          minimumValue={1}
          maximumValue={200}
          value={3}
          maximumTrackTintColor="#FFFFFF"
          minimumTrackTintColor="#655D5D"
          thumbTintColor="#655D5D"
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
        />
      </View>
    </View>
  </View>
);

export default Radius;
