import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';

const TutorialCreateGroup = ({ navigation }) => {
  window.addEventListener = (x) => x;
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
        createdAt: new Date().getTime(),
        createdBy: user,
        name: group,
        names: [],
      })
      .then(() => navigation.navigate('TutorialSelectGroup'));
  }

  return (
    <View style={styles.viewContainer}>
      <View style={styles.tutorialText}>
        <Text style={styles.tutorialAanwijzing}>
          Geef de groep een naam, zodat je deze later snel kunt terugvinden.
        </Text>
      </View>
      <Image
        style={styles.arrow}
        source={require('../../../assets/arrowBottom.png')}
      />
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

      <TouchableOpacity style={styles.hesjesView}>
        <Icon name="person-add" size={20} style={styles.groepIcon} />
        <Text style={styles.hesjesTitle}>Hesjes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveBtn} onPress={() => createGroup()}>
        <Text style={styles.saveText}>Groep opslaan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tutorialAanwijzing: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24,

    marginBottom: 60,
    ...Platform.select({
      ios: {
        top: -90,
        marginLeft: 40,
        marginRight: 90,
      },
      android: {
        top: -70,
        marginLeft: 40,
        marginRight: 40,
      },
    }),
  },
  arrow: {
    width: 40,
    height: 140,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 60,
    zIndex: 2,
    ...Platform.select({
      ios: {
        top: 270,
      },
      android: {
        top: 180,
      },
    }),
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
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    height: 50,
  },
  inputText: {
    height: 50,
    color: 'black',
    width: '100%',
  },
  groepIcon: {
    padding: 20,
    color: '#9F9F9F',
  },
  hesjesView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '72%',
    height: 50,
    marginBottom: 20,
    opacity: 0.2,
    color: '#9F9F9F',
  },
  hesjestitle: { color: '#9F9F9F' },
  forgot: {
    color: '#F6C004',
    fontSize: 12,
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
    bottom: -50,
  },
  saveText: {
    color: '#F6C004',
  },
});
export default TutorialCreateGroup;
