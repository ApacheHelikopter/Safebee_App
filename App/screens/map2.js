import React, { useEffect, useState } from 'react';
import MapView, { Circle } from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Slider,
  Modal,
  TouchableHighlight,
} from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { isPointWithinRadius } from 'geolib';
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

  const [locationUser, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [countSlider, setCountSlider] = useState(0);

  const [gpsLat, setGpsLat] = useState(0);
  const [gpsLng, setGpsLng] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [positionHesje, setPositionHesje] = useState(true);

  const [groupActive, setGroupActive] = useState(false);

  const db = firebase.database();
  const dbFire = firebase.firestore();

  useEffect(() => {});

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

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    const currentUser = firebase.auth().currentUser.uid;

    const checkActiveGroups = () => {
      dbFire
        .collection('groups')
        .where('createdBy', '==', currentUser)
        .onSnapshot((querySnapShot) => {
          querySnapShot.docs.map((documentSnapShot) => {
            if (
              documentSnapShot.data().status == true &&
              documentSnapShot.data().names == 'Safebee'
            ) {
              setGroupActive(true);
            } else {
              setGroupActive(false);
            }
          });
        });
    };
    checkActiveGroups();
  }, []);

  const map = React.createRef();

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

    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    const isHesjeInRadius = isPointWithinRadius(
      { latitude: gpsLat, longitude: gpsLng },
      {
        latitude: locationUser.coords.latitude,
        longitude: locationUser.coords.longitude,
      },
      countSlider.value
    );

    if (groupActive && isHesjeInRadius == false) {
      setPositionHesje(false);
      setModalVisible(true);
    } else {
      setPositionHesje(true);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.viewContainerModal}>
          <View style={styles.modalView}>
            <Text style={styles.titleModal}>OPGELET!</Text>
            <Text style={styles.bodyModal}>
              Er is een hesje buiten de zone gegaan!
            </Text>
            <View>
              <TouchableOpacity
                style={styles.groepIconRight}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.backModal}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.radiusView}>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}></Text>
          <View style={styles.sliderView}>
            <View style={styles.sliderWidth}>
              <Slider
                style={{ width: 270 }}
                step={5}
                minimumValue={1}
                maximumValue={200}
                value={countSlider}
                onValueChange={(value) => setCountSlider({ value })}
                maximumTrackTintColor="#FFFFFF"
                minimumTrackTintColor="#655D5D"
                thumbTintColor="#655D5D"
                thumbStyle={styles.thumb}
                trackStyle={styles.track}
              />
            </View>
          </View>
        </View>
      </View>
      {locationUser ? (
        <MapView
          ref={map}
          style={styles.mapStyle}
          initialRegion={initialPosition}
          mapType={'satellite'}
          showsUserLocation
          onUserLocationChange={getLocationHesjes}
        >
          <Circle
            center={{
              latitude: locationUser.coords.latitude,
              longitude: locationUser.coords.longitude,
            }}
            radius={countSlider.value}
            fillColor={'rgba(246, 192, 4, 0.4)'}
          />
          {groupActive == true && positionHesje == true ? (
            <MapView.Marker
              key={1}
              coordinate={gpsLocation}
              title={'SAFEBEE'}
              description={'Binnen de radius'}
            >
              <View style={styles.markerHesje} />
            </MapView.Marker>
          ) : null}

          {groupActive == true && positionHesje == false ? (
            <MapView.Marker
              key={1}
              coordinate={gpsLocation}
              title={'SAFEBEE'}
              description={'!Buiten de radius!'}
            >
              <View style={styles.markerHesjeBDZ} />
            </MapView.Marker>
          ) : null}
        </MapView>
      ) : null}
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
  markerHesjeBDZ: {
    height: 10,
    width: 10,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: 'red',
    color: 'red',
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

  //SLIDER
  panel: {
    height: '100%',
  },
  panelTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    height: 35,
    color: '#ffffff',
  },
  sliderView: {
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  track: {
    height: 20,
  },
  sliderWidth: {
    padding: 20,
  },

  //MODAL

  viewContainerModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    width: '80%',
    height: '22%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleModal: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#F00F0F',
  },
  backModal: {
    color: '#F6C004',
    left: '30%',
    fontSize: 16,
    padding: 20,
  },
  groepIconRight: {
    marginLeft: 200,
  },
});

export default GeoLocationMap;
