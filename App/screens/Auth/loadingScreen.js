import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'App' : 'Auth');
    });
  }, []);

  const checkUserState = async () => {
    try {
      const doneTutorial = await AsyncStorage.getItem('TUTORIAL');
      if (doneTutorial !== null) {
        return true;
      } else {
        console.log(doneTutorial);
        navigation.navigate('TutorialIntro');
      }
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
};

export default LoadingScreen;
