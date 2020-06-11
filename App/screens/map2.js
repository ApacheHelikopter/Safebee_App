import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Radius from '../components/Radius/radius';
import renderHeader from '../components/BottomSheet/header';
import * as firebase from 'firebase';
import 'firebase/firestore';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GeoLocationMap = () => {
  window.addEventListener = (x) => x;
  const [initialPosition, setInitialPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const [markerPosition, setmarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [gpsLocation, setGpsLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [gpsLat, setGpsLat] = useState(0);
  const [gpsLng, setGpsLng] = useState(0);

  const db = firebase.database();

  useEffect(() => {
    async function currentPosition() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = parseFloat(position.coords.latitude);
          let long = parseFloat(position.coords.longitude);

          let initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };

          setInitialPosition(initialRegion);
          setmarkerPosition(initialRegion);
        },
        (error) => alert(JSON.stringify(error)),
        { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
      );
    }
    currentPosition();

    async function watchPosition() {
      let watchID = navigator.geolocation.watchPosition((position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var lastRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        setInitialPosition(lastRegion);
        setmarkerPosition(lastRegion);
        return () => {
          navigator.geolocation.clearWatch(watchID);
        };
      });
    }
    watchPosition();
  }, []);

  const bottomSheetRef = React.createRef();
  const map = React.createRef();
  const showRadius = () => {
    bottomSheetRef.current.snapTo(0);
  };

  const showCurrentLocation = () => {
    map.current.animateToRegion(markerPosition, 1000);
  };

  const getLocationHesjes = () => {
    const setLocationHesje = () => {
      const firebaseGetLat = () => {
        db.ref('lat').on('value', (snapshot) => {
          const gpsLat = snapshot.val();
          setGpsLat(gpsLat);
        });
      };
      firebaseGetLat();

      const firebaseGetLng = () => {
        db.ref('lng').on('value', (snapshot) => {
          const gpsLng = snapshot.val();
          setGpsLng(gpsLng);
        });
      };
      firebaseGetLng();

      let gpsLocation = {
        latitude: gpsLat,
        longitude: gpsLng,
      };
      setGpsLocation(gpsLocation);
    };
    setLocationHesje();
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.mapStyle}
        initialRegion={initialPosition}
        mapType={'satellite'}
        showsUserLocation
        onUserLocationChange={getLocationHesjes}
      >
        <MapView.Marker key={1} coordinate={gpsLocation}>
          <View style={styles.markerHesje} />
        </MapView.Marker>
      </MapView>
      <View style={styles.radiusView}>
        <Radius></Radius>
      </View>
      <TouchableOpacity
        onPress={showCurrentLocation}
        style={styles.FABposition}
      >
        <Icon name="gps-fixed" size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  radiusView: {
    position: 'absolute',
    bottom: 35,
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(252, 211, 3, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(252, 211, 3, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerHesje: {
    height: 10,
    width: 10,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#007AFF',
    color: '#007AFF',
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#007AFF',
    color: '#007AFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  FAB: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    bottom: '85%',
    backgroundColor: '#F6C004',
    borderRadius: 30,
    elevation: 8,
  },
  FABposition: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 40,
    bottom: 120,
    backgroundColor: '#F6C004',
    borderRadius: 30,
    elevation: 8,
  },
});

export default GeoLocationMap;
