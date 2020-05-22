import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GroepButton = ({ name }) => {
  return (
    <View style={styles.inputView}>
      <Icon name="group" size={20} style={styles.groepIcon} />
      <Text style={styles.inputText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
  },
  inputText: {
    paddingTop: 14,
    height: 50,
    color: '#9F9F9F',
    width: '100%',
  },
  groepIcon: {
    padding: 20,
  },
});

export default GroepButton;
