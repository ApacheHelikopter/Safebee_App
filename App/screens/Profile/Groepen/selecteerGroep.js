import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import GroepButton from '../../../components/Groepen/GroepButton';
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
      <View style={styles.error}>
        {groupName.length > 0 ? (
          <FlatList
            data={groupName}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <GroepButton name={item.name} />}
          />
        ) : (
          <Text style={styles.errorMessage}>
            Er bestaan nog geen groepen voor dit account. Voeg een groep toe.
          </Text>
        )}

        {/* <Text style={styles.errorMessage}>
            Er bestaan nog geen groepen voor dit account. Voeg een groep toe.
          </Text> */}
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('CreateGroep')}
      >
        <Text style={styles.loginText}>Groep toevoegen</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.register}>Klaar</Text>
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

export default SelecteerGroep;
