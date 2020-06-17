import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import GroepButton from '../../../components/Groepen/GroepButton';
import GroepButtonActive from '../../../components/Groepen/GroepButtonActive';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

const MijnGroepen = ({ navigation }) => {
  window.addEventListener = x => x;
  const [activeGroups, setActiveGroups] = useState([]);
  const [nonActiveGroups, setNonActiveGroups] = useState([]);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const db = firebase.firestore();

  useEffect(() => {
    let currentUser = firebase.auth().currentUser.uid;
    setUser(currentUser);

    const getActiveGroups = () => {
      db.collection('groups')
        .where('createdBy', '==', currentUser)
        .where('status', '==', true)
        .onSnapshot(querySnapShot => {
          const groups = querySnapShot.docs.map(documentSnapShot => {
            return {
              _id: documentSnapShot.id,
              name: '',
              createdAt: new Date().getTime(),
              ...documentSnapShot.data(),
            };
          });
          setActiveGroups(groups);
          console.log(activeGroups);
          if (loading) {
            setLoading(false);
          }
        });
    };
    getActiveGroups();

    const getNonActiveGroups = () => {
      db.collection('groups')
        .where('createdBy', '==', currentUser)
        .where('status', '==', false)
        .onSnapshot(querySnapShot => {
          const groups = querySnapShot.docs.map(documentSnapShot => {
            return {
              _id: documentSnapShot.id,
              name: '',
              createdAt: new Date().getTime(),
              ...documentSnapShot.data(),
            };
          });
          setNonActiveGroups(groups);

          if (loading) {
            setLoading(false);
          }
        });
    };
    getNonActiveGroups();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  async function onGroepLongPressActivate(group_id) {
    await firebase
      .firestore()
      .collection('groups')
      .doc(group_id)
      .update({
        status: true,
      });
  }

  async function onGroepLongPressDeactivate(group_id) {
    await firebase
      .firestore()
      .collection('groups')
      .doc(group_id)
      .update({
        status: false,
      });
  }

  return (
    <>
      {activeGroups.length || nonActiveGroups.length > 0 ? (
        <View style={styles.viewContainer}>
          <Text style={styles.textGroepBewerken}>
            Klik op de groep om een groep te selecteren of op bewerken als je
            een groep wilt bewerken of toevoegen.
          </Text>
          <View style={styles.flatlist}>
            <FlatList
              data={activeGroups}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onGroepLongPressDeactivate(item._id)}
                >
                  <GroepButtonActive name={item.name} />
                </TouchableOpacity>
              )}
            />
            <FlatList
              data={nonActiveGroups}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onGroepLongPressActivate(item._id)}
                >
                  <GroepButton name={item.name} />
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity>
            <Text
              style={styles.register}
              onPress={() => navigation.navigate('SelecteerGroep')}
            >
              BEWERKEN
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.viewContainer}>
          <View style={styles.error}>
            <Text style={styles.errorText}>
              Je hebt nog geen groepen, klik op bewerken om groepen toe te
              voegen.
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={styles.register}
              onPress={() => navigation.navigate('SelecteerGroep')}
            >
              BEWERKEN
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
  textGroepBewerken: {
    color: '#9F9F9F',
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 40,
        marginLeft: 40,
        marginRight: 60,
        marginBottom: 20,
      },
      android: {
        top: 20,
        marginLeft: 40,
        marginRight: 60,
        marginBottom: 20,
      },
    }),
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
    color: '#F6C004',
    fontSize: 14,
  },
  logo: {
    width: 60,
    height: 130,
    resizeMode: 'stretch',
    marginBottom: 40,
    marginTop: 40,
  },
  flatlist: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 40,
    top: 0,
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 40,
    top: -100,
  },
  errorText: {
    color: '#9F9F9F',
    fontSize: 14,
    textAlign: 'center',
  },
  errorMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  },
});

export default MijnGroepen;
