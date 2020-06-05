import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';

const TutorialModal = ({ route, navigation }) => {
  window.addEventListener = (x) => x;
  const { groupDetails } = route.params;
  const [groupName, setGroupName] = useState(groupDetails.name);
  const [modalVisible, setModalVisible] = useState(false);
  const db = firebase.firestore();

  const addHesjes = () => {
    setModalVisible(modalVisible);
    navigation.navigate('QRScanner', { groupDetails: groupDetails });
  };
  return (
    <View style={styles.viewContainer}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.viewContainerModal}>
          <View style={styles.modalView}>
            <Text style={styles.titleModal}>Hesjes</Text>
            {groupDetails.names.length > 0 ? (
              <View style={styles.bodyModal}>
                {groupDetails.names.map((name) => (
                  <Text key={name}>{name}</Text>
                ))}
              </View>
            ) : (
              <Text style={styles.bodyModal}>
                Er zijn nog geen namen ingegeven, voeg deze toe.
              </Text>
            )}

            <View>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.backModal}>Terug</Text>
              </TouchableHighlight>
              <TouchableOpacity
                style={styles.groepIconRight}
                onPress={() => addHesjes()}
              >
                <Icon name="person-add" size={20} style={styles.groepIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />
      <View style={styles.error}>
        <View style={styles.inputView}>
          <Icon name="group" size={20} style={styles.groepIcon} />
          <TextInput
            style={styles.inputText}
            placeholder={groupDetails.name}
            placeholderTextColor="#9F9F9F"
            autoCapitalize="none"
            value={groupName}
            onChangeText={setGroupName}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.hesjesView}
      >
        <Icon name="face" size={30} style={styles.faceIcon} />

        <Text style={styles.loginText}>Hesjes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tutorialAanwijzing: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 60,
    top: -70,
  },
  arrow: {
    width: 30,
    height: 100,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 60,
    zIndex: 2,
    top: 170,
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
export default TutorialModal;
