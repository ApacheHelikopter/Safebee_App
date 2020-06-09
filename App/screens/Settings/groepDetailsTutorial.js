import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import GroepButton from '../../components/Groepen/GroepButton';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

const SelecteerGroep = ({ navigation }) => {
  window.addEventListener = x => x;
  const [groupName, setGroupName] = useState([]);

  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();

  useEffect(() => {
    const currentUser = firebase.auth().currentUser.uid;

    const unsubscribe = db
      .collection('groups')
      .where('createdBy', '==', currentUser)
      .onSnapshot(querySnapShot => {
        const groups = querySnapShot.docs.map(documentSnapShot => {
          return {
            _id: documentSnapShot.id,
            name: '',
            createdAt: new Date().getTime(),
            ...documentSnapShot.data(),
          };
        });
        setGroupName(groups);

        if (loading) {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.viewContainer}>
      <View style={styles.tutorialText}>
        <Text style={styles.tutorialAanwijzing}>
          Alle hesjes zijn nu gescand en opgeslagen in jouw groep
        </Text>
      </View>
      <View style={styles.error}>
        <FlatList
          data={groupName}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('GroepDetails', { groupDetails: item })
              }
            >
              <GroepButton name={item.name} />
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('CreateGroep')}
        >
          <Text style={styles.loginText}>Groep toevoegen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MijnGroepen')}>
          <Text style={styles.registerBtn}>KLAAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //NORMAL
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
  registerBtn: {
    color: '#FFFFFF',
    fontSize: 14,
    zIndex: 200,
    fontWeight: 'bold',
    marginTop: 10,
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

  //TUTORIAL
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    zIndex: 0,
  },
  tutorialStap: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 26,
    marginLeft: 40,
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
    width: 50,
    height: 190,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 60,
    zIndex: 2,
  },
  errorMessageTutorial: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9F9F9F',
  },
});

export default SelecteerGroep;
