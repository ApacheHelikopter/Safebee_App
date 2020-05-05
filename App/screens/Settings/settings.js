import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CustomButton from '../../components/CustomButton/customButton';

const SettingsTab = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.settingsTab}>
        <View style={styles.settingsActions}>
          <CustomButton
            title="Meldingen"
            onPress={() => navigation.navigate('Meldingen')}
          />
          <CustomButton
            title="FAQ"
            onPress={() => navigation.navigate('FAQ')}
          />
          <CustomButton
            title="Help"
            onPress={() => navigation.navigate('Help')}
          />
        </View>
        <View style={styles.containerBttns}>
          <View style={styles.languageBttns}>
            <TouchableOpacity style={styles.languageBttnSelected}>
              <Text>nl</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.languageBttn}>
            <Text>fr</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageBttn}>
            <Text>en</Text>
          </TouchableOpacity>
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
  settingsTab: {
    display: 'flex',
    margin: '8%',
  },

  settingsActions: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  containerBttns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageBttns: {
    margin: '4%',
  },
  languageBttn: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#eeee',
    borderRadius: 50,
    margin: '4%',
  },
  languageBttnSelected: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#F6C004',
    borderRadius: 50,
    margin: '4%',
  },
});

export default SettingsTab;
