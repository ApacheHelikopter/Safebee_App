import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as firebase from 'firebase';

const SelecteerGroep = ({ navigation }) => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.error}>
        <Text style={styles.errorMessage}>
          Er bestaan nog geen groepen voor dit account. Voeg een groep toe.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('CreateGroep')}
      >
        <Text style={styles.loginText}>Groep toevoegen</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.register}>Klaar</Text>
      </TouchableOpacity>
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
    marginTop: 40,
    marginBottom: 10,
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
    marginBottom: 40,
  },
  errorMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  },
});

export default SelecteerGroep;
