import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CustomButton from '../../components/CustomButton/customButton';
import * as firebase from 'firebase';

const SettingsTab = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const { email } = firebase.auth().currentUser;
    setEmail(email);
    setDisplayName(displayName);
  });

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.settingsTab}>
        <View style={styles.settingsActions}>
          <CustomButton
            title="Meldingen"
            onPress={() => navigation.navigate('Meldingen')}
          />
          <CustomButton
            title="FAQ"
            onPress={() => navigation.navigate('FAQ')}
          />
          <CustomButton title="Logout" onPress={handleLogout} />
        </View>
        <Text>Hi, {email}</Text>

        <View style={styles.containerBttns}>
          <View style={styles.languageBttns}>
            <TouchableOpacity style={styles.languageBttnSelected}>
              <Text>nl</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.languageBttns}>
            <TouchableOpacity style={styles.languageBttn}>
              <Text>fr</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.languageBttns}>
            <TouchableOpacity style={styles.languageBttn}>
              <Text>en</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    height: '100%',
    fontFamily: 'Roboto, Helvetica Neue, Helvetica, sans-serif',
  },
  settingsTab: {
    display: 'flex',
    margin: '8%',
  },

  settingsActions: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  containerBttns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageBttns: {
    paddingTop: '30%',
    margin: '1%',
  },
  languageBttn: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#eeee',
    borderRadius: 50,
    margin: '2%',
  },
  languageBttnSelected: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#F6C004',
    borderRadius: 50,
    margin: '2%',
  },
});

export default SettingsTab;
