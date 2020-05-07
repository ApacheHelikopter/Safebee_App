import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const IMAGE_SIZE = 200;
const state = {
  email: '',
  password: '',
};

const Login = () => {
  return (
    <View style={StyleSheet.ViewContainer}>
      <Image
        style={styles.logo}
        source={require('./../../../assets/logo.png')}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="E-mailadres"
          placeholderTextColor="#9F9F9F"
          onChangeText={(text) => this.setState({ email: text })}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Wachtwoord"
          placeholderTextColor="#9F9F9F"
          onChangeText={(text) => this.setState({ password: text })}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot}>Wachtwoord vergeten?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Inloggen</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>nog geen lid? registreer dan nu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
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
    color: 'white',
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
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#F6C004',
  },
  logo: {
    width: 60,
    height: 130,
    resizeMode: 'stretch',
    marginBottom: 40,
    marginTop: 40,
  },
});

export default Login;
