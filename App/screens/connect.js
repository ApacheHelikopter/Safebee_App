import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

const hesjes = () => (
  <View style={styles.panel}>
    <Text style={styles.panelTitle}>Profiel</Text>
    <Text style={styles.panelSubtitle}>20 hesjes geconnecteerd</Text>
    <View style={styles.panelButton}>
      <Text style={styles.panelButtonTitle}>Mijn groepen</Text>
    </View>
    <View style={styles.panelButton}>
      <Text style={styles.panelButtonTitle}>Hesjes connecteren</Text>
    </View>
    <View style={styles.panelButton}>
      <Text style={styles.panelButtonTitle}>Hesjes afmelden</Text>
    </View>
  </View>
);

const renderHeader = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>
);

export default () => (
  <BottomSheet
    snapPoints={[500, 130, 40]}
    renderContent={hesjes}
    renderHeader={renderHeader}
    initialSnap={1}
    style={styles.padding}
  />
);

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
  padding: {
    paddingTop: 150,
  },
  container: {
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 550,
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
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginTop: 40,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  panel: {
    height: 550,
    backgroundColor: '#f7f5eee8',
  },
  panelTitle: {
    alignSelf: 'center',
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginTop: 40,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
