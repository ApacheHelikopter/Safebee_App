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
  const [user, setUser] = useState(null);
  const [group, setGroup] = useState('');

  useEffect(() => {
    let currentUser = firebase.auth().currentUser.uid;
    setUser(currentUser);
  });

  async function createGroup() {
    await firebase
      .firestore()
      .collection('groups')
      .add({
        amount: count,
        createdAt: new Date().getTime(),
        createdBy: user,
        name: group,
        names: [],
      })
      .then(() => navigation.navigate('SelecteerGroep'));
  }

  return (
    <View style={styles.viewContainer}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/logo.png')}
      />
      <View style={styles.textTutorial}>
        <Text style={styles.textOneTutorial}>
          Kies een groepsnaam voor jouw groep
        </Text>
      </View>
      <View style={styles.inputView}>
        <Icon name="group" size={20} style={styles.groepIcon} />
        <TextInput
          style={styles.inputText}
          placeholder="Groepsnaam"
          placeholderTextColor="#9F9F9F"
          autoCapitalize="none"
          value={group}
          onChangeText={setGroup}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={() => createGroup()}>
        <Text style={styles.saveText}>Groep opslaan</Text>
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
  saveText: {
    color: '#F6C004',
  },
  logo: {
    width: 60,
    height: 130,
    resizeMode: 'stretch',
    marginBottom: 0,
    ...Platform.select({
      ios: {
        top: -60,
      },
      android: {
        top: -50,
      },
    }),
  },
  groepIcon: {
    padding: 20,
  },
  textTutorial: {
    alignItems: 'center',
    ...Platform.select({
      ios: {
        top: -10,
        marginBottom: 30,
      },
      android: {
        top: -10,
        marginBottom: 30,
      },
    }),
  },
  textOneTutorial: {
    color: '#9F9F9F',
  },
  textTwoTutorial: {
    color: '#9F9F9F',
  },
  counterBtn: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#aaaa',
    borderRadius: 50,
    margin: '2%',
  },
  otherForm: {
    flexDirection: 'row',
  },
  ledenText: {
    width: '40%',
    marginTop: 14,
  },
  countSign: {
    marginTop: -10,
  },
  countNumber: {
    marginTop: 14,
  },
});

export default CreateGroep;
