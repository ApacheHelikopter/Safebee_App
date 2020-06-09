import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoadingScreen = ({ navigation }) => {
  const [tutorialState, setTutorialState] = useState(null);

  const loadTutorialState = async () => {
    try {
      console.log('here');
      const value = await AsyncStorage.getItem('TUTORIAL');
      console.log(value);
      if (value !== null) {
        console.log(value);
        setTutorialState(value);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    loadTutorialState();
  }, []);

  const checkUserState = () => {
    try {
      const userExists = firebase.auth().currentUser;
      console.log(tutorialState);
      if (tutorialState !== null && userExists !== null) {
        return 'App';
      } else if (tutorialState == null && userExists !== null) {
        return 'Tutorial';
      }
    } catch (e) {
      alert(e);
    }
  };

  firebase.auth().onAuthStateChanged(user => {
    navigation.navigate(user ? 'App' : 'Auth');
  });

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
};

export default LoadingScreen;
