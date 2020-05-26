import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton/customButton';

const ProfielTab = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.profileTab}>
        <View>
          <TouchableOpacity style={styles.textcontainer}>
            <Text style={styles.text}>20</Text>
            <Text style={styles.times}>x</Text>
            <Icon name="face" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileActions}>
          <CustomButton
            title="Mijn groepen"
            onPress={() => navigation.navigate('MijnGroepen')}
          />
          <CustomButton
            title="Hesjes connecteren"
            onPress={() => navigation.navigate('ConnectHesje')}
          />
          <CustomButton
            title="Hesjes afmelden"
            onPress={() => navigation.navigate('DisconnectHesje')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    height: '100%',
  },
  profileTab: {
    marginTop: 80,
    display: 'flex',
    margin: '8%',
  },
  profileActions: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 24,
  },
  times: {
    fontSize: 24,
    marginRight: 10,
  },
  textcontainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default ProfielTab;
