import React from 'react';
import { Divider } from 'react-native-elements';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <View style={styles.singleButton}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfielTab = ({ navigation }) => {
  return (
    <View style={styles.profileTab}>
      <View>
        <TouchableOpacity>
          <Text>20</Text>
        </TouchableOpacity>
        <Text>hesjes geconnecteerd</Text>
      </View>
      <View style={styles.profileActions}>
        <CustomButton
          title="Mijn groepen"
          onPress={() => navigation.navigate('Groepen')}
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
  );
};

const styles = StyleSheet.create({
  profileTab: {
    display: 'flex',
    margin: '8%',
  },
  button: {
    height: 50,
    justifyContent: 'center',

    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },

  text: {
    fontSize: 16,
    color: 'black',
  },

  profileActions: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  singleButton: {
    margin: '2%',
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default ProfielTab;
