import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton/customButton';

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
  );
};

const styles = StyleSheet.create({
  profileTab: {
    display: 'flex',
    margin: '8%',
  },

  profileActions: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default ProfielTab;
