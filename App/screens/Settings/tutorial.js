import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Tutorial = ({ navigation }) => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.tutorialText}>
        <Text style={styles.tutorialStap}>Stap 1</Text>
        <Text style={styles.tutorialAanwijzing}>
          Welkom bij Safebee, (NAAM)! Maak hier je groep aan.
        </Text>
      </View>
      <Image
        style={styles.arrow}
        source={require('../../../assets/arrowBottom.png')}
      />
      <View style={styles.error}>
        <Text style={styles.errorMessage}>
          Er bestaan nog geen groepen voor dit account. Voeg een groep toe.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('TutorialCreateGroup')}
      >
        <Text style={styles.loginText}>Groep toevoegen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tutorialStap: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 26,
    marginLeft: 40,
  },
  tutorialAanwijzing: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 60,
  },
  arrow: {
    width: 50,
    height: 190,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 60,
    zIndex: 2,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    zIndex: 0,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot: {
    color: '#F6C004',
    fontSize: 12,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#ffffff',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 10,
    zIndex: 0,
  },
  loginText: {
    color: '#F6C004',
  },
  register: {
    color: '#9F9F9F',
    fontSize: 12,
  },
  logo: {
    width: 60,
    height: 130,
    resizeMode: 'stretch',
    marginBottom: 40,
    marginTop: 40,
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginTop: 40,
  },
  errorMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9F9F9F',
  },
});
export default Tutorial;
