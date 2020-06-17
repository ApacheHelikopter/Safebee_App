import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

const FAQ = ({ navigation }) => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.error}>
        <Text>Hallo! Kom later terug, dit hoort nu nog niet bij de demo</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.loginText}>Ga terug</Text>
        </TouchableOpacity>
      </View>
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
  loginBtn: {
    width: '100%',
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
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 40,
  },
});

export default FAQ;
