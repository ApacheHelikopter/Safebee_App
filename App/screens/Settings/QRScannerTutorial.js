import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import 'firebase/firestore';

const QRScannerTutorial = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [currentGroup, setCurrentGroup] = useState([]);
  const { groupDetails } = route.params;
  console.log(groupDetails);
  const db = firebase.firestore();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const { width } = Dimensions.get('screen');

  const finishScan = () => {
    const currentUser = firebase.auth().currentUser.uid;

    const unsubscribe = db
      .collection('groups')
      .where('createdBy', '==', currentUser)
      .where('_id', '==', groupDetails._id)
      .onSnapshot((querySnapShot) => {
        const groups = querySnapShot.docs.map((documentSnapShot) => {
          return {
            _id: documentSnapShot.id,
            name: '',
            createdAt: new Date().getTime(),
            ...documentSnapShot.data(),
          };
        });
        setCurrentGroup(groups);
      });
    return () => unsubscribe().then();
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    db.collection('groups')
      .doc(groupDetails._id)
      .update({ names: firebase.firestore.FieldValue.arrayUnion(data) });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const leftTop = {
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: 'white',
  };
  const leftBottom = {
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
  };
  const rightTop = {
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: 'white',
  };
  const rightBottom = {
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: width / 2, height: width / 2 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, ...leftTop }} />
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, ...rightTop }} />
          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, ...leftBottom }} />
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, ...rightBottom }} />
          </View>
        </View>
      </View>
      <View style={styles.buttonReady}>
        <TouchableHighlight
          style={styles.readyView}
          onPress={() =>
            navigation.navigate('GroepDetails', { groupDetails: groupDetails })
          }
        >
          <Text style={styles.readyText}>klaar</Text>
        </TouchableHighlight>
      </View>
      {scanned ? (
        <View style={styles.buttonNext}>
          <TouchableHighlight
            style={styles.readyViewNext}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.scanText}>Scan volgend hesje</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <View style={styles.scanHesjeView}>
          <Text style={styles.scanHesje}>Scan het hesje</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonNext: {
    marginLeft: 60,
    marginRight: 60,
  },
  readyViewNext: {
    width: '100%',
    backgroundColor: '#ffffff90',
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
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    ...Platform.select({
      ios: {
        bottom: 150,
      },
      android: {
        bottom: 120,
      },
    }),
  },
  scanText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  readyView: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    position: 'absolute',
    ...Platform.select({
      ios: {
        bottom: 120,
      },
      android: {
        bottom: 90,
      },
    }),
  },
  readyText: {
    fontSize: 16,
    color: '#F6C004',
  },
  scanHesjeView: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 180,
      },
      android: {
        top: 120,
      },
    }),
  },
  scanHesje: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default QRScannerTutorial;
