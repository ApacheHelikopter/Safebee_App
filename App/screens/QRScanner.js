import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import 'firebase/firestore';

const QRScanner = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { groupDetails } = route.params;
  const db = firebase.firestore();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

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

      <Button
        title="Klaar"
        onPress={() =>
          navigation.navigate('GroepDetails', { groupDetails: groupDetails })
        }
      />

      {scanned ? (
        <Button
          title={'Scan volgend hesje'}
          onPress={() => setScanned(false)}
        />
      ) : (
        <Text>Scan uw fluohesje</Text>
      )}
    </View>
  );
};

export default QRScanner;
