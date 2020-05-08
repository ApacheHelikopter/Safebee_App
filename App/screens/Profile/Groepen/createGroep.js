import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';

const CreateGroep = ({ navigation }) => {
  return (
    <View style={styles.viewContainer}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/logo.png')}
      />
      <View style={styles.inputView}>
        <Icon name="group" size={20} style={styles.groepIcon} />
        <TextInput
          style={styles.inputText}
          placeholder="Groepsnaam"
          placeholderTextColor="#9F9F9F"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.loginText}>Groep opslaan</Text>
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
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
    width: '100%',
  },
  forgot: {
    color: '#F6C004',
    fontSize: 12,
  },
  saveBtn: {
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
  groepIcon: {
    padding: 20,
  },
});

export default CreateGroep;
