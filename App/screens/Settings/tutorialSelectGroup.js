import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import GroepButton from '../../components/Groepen/GroepButton';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

const SelecteerGroep = ({ navigation }) => {
  window.addEventListener = (x) => x;
  const [groupName, setGroupName] = useState([]);

  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();

  useEffect(() => {
    const currentUser = firebase.auth().currentUser.uid;

    const unsubscribe = db
      .collection('groups')
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
          Selecteer je nieuw aangemaakte groep
        </Text>
      </View>
      <Image
        style={styles.arrow}
        source={require('../../../assets/arrowBottom.png')}
      />
      <View style={styles.error}>
        <FlatList
          data={groupName}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TutorialModal', { groupDetails: item })
              }
            >
              <GroepButton name={item.name} />
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Groep toevoegen</Text>
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
  saveBtn: {
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
    bottom: -50,
  },
  saveText: {
    color: '#F6C004',
  },
  register: {
    color: '#9F9F9F',
    fontSize: 12,
    zIndex: 200,
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
    marginBottom: 120,
    ...Platform.select({
      ios: {
        marginLeft: 25,
        marginRight: 40,
        marginTop: -70,
      },
      android: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: -40,
      },
    }),
  },
  arrow: {
    width: 30,
    height: 120,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 90,
    zIndex: 2,
    top: 190,
    ...Platform.select({
      ios: {
        top: 280,
      },
      android: {
        top: 190,
      },
    }),
  },
  errorMessageTutorial: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9F9F9F',
  },
});

export default SelecteerGroep;
