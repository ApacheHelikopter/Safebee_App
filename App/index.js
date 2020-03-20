import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet';
import Navigation from './config/navigation';
import connectHesjes from './screens/connectHesjes';

export default class Example extends React.Component {

    renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    )

    bs = React.createRef()

    render() {
        return (
            <View style={styles.container}>
                <BottomSheet
                    ref={this.bs}
                    snapPoints={[500, 130, 0]}
                    renderContent={connectHesjes}
                    renderHeader={this.renderHeader}
                    initialSnap={1}
                />
                <TouchableWithoutFeedback onPress={() => this.bs.current.snapTo(0)}>
                    <Image style={styles.map} />
                </TouchableWithoutFeedback>
                
            </View>
        )
    }
}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    box: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    panel: {
        height: 550,
        backgroundColor: '#f7f5eee8',
    },
    header: {
        backgroundColor: '#f7f5eee8',
        shadowColor: '#000000',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
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