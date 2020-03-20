import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default () => (
    <View style={styles.panel}>
        <Text style={styles.panelTitle}>Connectie hesjes</Text>
        <Text style={styles.panelSubtitle}>
            20 hesjes geconnecteerd
        </Text>
        <View style={styles.panelButton}>
            <Text style={styles.panelButtonTitle}>Hesjes connecteren</Text>
        </View>
        <View style={styles.panelButton}>
            <Text style={styles.panelButtonTitle}>Hesjes afmelden</Text>
        </View>
        <Image
            style={styles.photo}

        />
    </View>
);

const styles = StyleSheet.create({
    panel: {
        height: 550,
        backgroundColor: '#f7f5eee8',
    },
    panelTitle: {
        alignSelf: 'center',
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginTop: 40,
    },
    panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#318bfb',
        alignItems: 'center',
        marginVertical: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
    },
    map: {
        height: '100%',
        width: '100%',
    },
})