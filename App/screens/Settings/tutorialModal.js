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
  const { groupNameCurrent } = route.params;
  console.log(groupNameCurrent);
  const [modalVisible, setModalVisible] = useState(true);
  const [groupDetails, setGroupDetails] = useState([]);
  const db = firebase.firestore();

  const addHesjes = () => {
    setModalVisible(modalVisible);
    navigation.navigate('QRScanner', { groupDetails: groupDetails });
  };

  useEffect(() => {
    const currentUser = firebase.auth().currentUser.uid;

    const unsubscribe = db
      .collection('groups')
      .where('name', '==', groupNameCurrent)
      .where('createdBy', '==', currentUser)
      .onSnapshot((querySnapShot) => {
        const groups = querySnapShot.docs.map((documentSnapShot) => {
          return {
            _id: documentSnapShot.id,
            name: '',
            createdAt: new Date().getTime(),
            ...documentSnapShot.data(),
          };
        });
        setGroupDetails(groups);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.viewContainer}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.viewContainerModal}>
          <View style={styles.tutorialText}>
            <Text style={styles.tutorialStap}>Stap 2</Text>
            <Text style={styles.tutorialAanwijzing}>
              Voeg vestjes toe aan je groep.
            </Text>
          </View>
          <View style={styles.modalView}>
            <Image
              style={styles.arrow}
              source={require('../../../assets/arrowBottom.png')}
            />
            <Text style={styles.titleModal}>Hesjes</Text>
            <Text style={styles.bodyModal}>
              Er zijn nog geen hesjes ingegeven, voeg deze toe.
            </Text>
            <View>
              <TouchableHighlight>
                <Text style={styles.backModal}>KLAAR</Text>
              </TouchableHighlight>
              <TouchableOpacity
                style={styles.groepIconRight}
                onPress={() => addHesjes()}
              >
                <Icon name="person-add" size={20} style={styles.groepaddIcon} />
                <Image
                  style={styles.circle}
                  source={require('../../../assets/tutorialCircle.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.inputView}>
        <Icon name="group" size={20} style={styles.groepIcon} />
        <TextInput
          style={styles.inputText}
          placeholder="Groepsnaam"
          placeholderTextColor="#9F9F9F"
          autoCapitalize="none"
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
  tutorialStap: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 26,
    marginLeft: 40,
    marginTop: -100,
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
    width: 40,
    height: 190,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 10,
    zIndex: 200,
    top: -60,
  },
  circle: {
    width: 55,
    height: 55,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 0,
  },
  groepaddIcon: {
    padding: 18,
    color: '#E5E5E5',
    zIndex: 200,
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  viewContainerModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
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
  },
  faceIcon: {
    color: '#9F9F9F',
    marginRight: 15,
  },
  forgot: {
    color: '#F6C004',
    fontSize: 12,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  modalBtns: {
    flexDirection: 'row',
  },
  titleModal: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  bodyModal: {
    marginLeft: 10,
    marginBottom: 10,
  },
  backModal: {
    color: '#F6C004',
    marginLeft: 120,
    marginTop: 20,
  },
  groepIconRight: {
    marginLeft: 200,
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
export default TutorialModal;
