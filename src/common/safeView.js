import React, { Component } from 'react';

import {
    Platform,
    Dimensions,
    View,
    SafeAreaView,
    StyleSheet,
    Animated,
    Text,
    Easing
} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialIcons';


const X_WIDTH = 375;
const X_HEIGHT = 812;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const PAGE_HEIGHT = isIphoneX() ? SCREEN_HEIGHT - 68 : SCREEN_HEIGHT;

const RATIO = SCREEN_WIDTH / X_WIDTH;
function isIphoneX() {
    return (
        (Platform.OS === 'ios'
            && ((SCREEN_HEIGHT === X_HEIGHT
                && SCREEN_WIDTH === X_WIDTH)
                || (SCREEN_HEIGHT === X_WIDTH
                    && SCREEN_WIDTH === X_HEIGHT)))
        || Platform.OS === 'android'
    );
}

class SafeBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // animate: new Animated.Value(0),
            // rotation: new Animated.Value(0),
            // show: false
        };
    }


    render() {
        if (isIphoneX()) {
            return (
                <SafeAreaView style={[style.container]}>
                    {this.props.children}
                </SafeAreaView>
            );
        }
        return (
            <View style={[style.container]}>
                {this.props.children}
            </View>
        );
    }
}

export default SafeBody;

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: isIphoneX() ? '#000' : '#fff',
        justifyContent: 'flex-start',
    },
    loadingMask: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        zIndex: 99,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center'
    },
    animate: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 1,
        alignSelf: 'center',
    }
});
