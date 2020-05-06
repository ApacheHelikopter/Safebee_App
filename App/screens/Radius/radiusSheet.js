import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Slider,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },

  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: '100%',
    backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    alignSelf: 'center',
    fontSize: 27,
    height: 35,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  sliderView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const renderHeader = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>
);

export default () => (
  <View style={styles.container}>
    <BottomSheet
      snapPoints={[250, 90]}
      renderContent={Radius}
      renderHeader={renderHeader}
      initialSnap={1}
      enabledBottomInitialAnimation={true}
      enabledContentGestureInteraction={false}
    />
    <MapView style={styles.mapStyle} />
  </View>
);
