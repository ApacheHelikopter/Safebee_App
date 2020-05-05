import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <View style={styles.singleButton}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
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

  singleButton: {
    margin: '2%',
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 0.7,
  },
});

export default CustomButton;
