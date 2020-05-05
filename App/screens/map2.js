import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
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
  marker: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    borderColor: '#007AFF',
    borderWidth: 3,
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
});

const GeoLocationMap = () => {
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

  useEffect(() => {
    async function currentPosition() {
      navigator.geolocation.getCurrentPosition(
        position => {
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
        error => alert(JSON.stringify(error)),
        { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
      );
    }
    currentPosition();

    async function watchPosition() {
      let watchID = navigator.geolocation.watchPosition(position => {
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={initialPosition}
        mapType={'satellite'}
      >
        <MapView.Marker coordinate={markerPosition}>
          <View style={styles.radius}>
            <View style={styles.marker} />
          </View>
        </MapView.Marker>
      </MapView>
    </View>
  );
};

export default GeoLocationMap;
