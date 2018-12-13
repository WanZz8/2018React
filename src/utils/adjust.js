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

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const PAGE_HEIGHT = isIphoneX() ? SCREEN_HEIGHT - 68 : SCREEN_HEIGHT;

export const RATIO = SCREEN_WIDTH / X_WIDTH;

export function isIphoneX() {
    return (
        (Platform.OS === 'ios'
            && ((SCREEN_HEIGHT === X_HEIGHT
                && SCREEN_WIDTH === X_WIDTH)
                || (SCREEN_HEIGHT === X_WIDTH
                    && SCREEN_WIDTH === X_HEIGHT)))
        || Platform.OS === 'android'
    );
}

export class SafeBody extends Component {
    _start = false;

    constructor(props) {
        super(props);

        this.state = {
            animate: new Animated.Value(0),
            rotation: new Animated.Value(0),
            show: false
        };
    }


    render() {
        if (isIphoneX()) {
            return (
                <SafeAreaView style={style.container}>
                    {
                        this.state.show
                            ? (

                                <Animated.View style={[{ opacity: this.state.animate },
                                    style.loadingMask]}
                                >
                                    <Animated.View style={[style.animate,
                                        {
                                            transform: [{
                                                rotateZ: this.state.rotation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0deg', '-360deg']
                                                })
                                            }]
                                        }
                                    ]}
                                    >
                                        <Icons
                                            style={{ alignSelf: 'center' }}
                                            name="loop"
                                            size={50}
                                        />
                                    </Animated.View>
                                </Animated.View>)

                            : (
                                null
                            )
                    }
                    {this.props.children}
                </SafeAreaView>
            );
        }
        return (
            <View style={[style.container]}>

                {
                    this.state.show
                        ? (

                            <Animated.View style={[{ opacity: this.state.animate },
                                style.loadingMask]}
                            >
                                <Animated.View style={[style.animate,
                                    {
                                        transform: [{
                                            rotateZ: this.state.rotation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '-360deg']
                                            })
                                        }]
                                    }
                                ]}
                                >
                                    <Icons
                                        style={{ alignSelf: 'center' }}
                                        name="loop"
                                        size={50}
                                    />
                                </Animated.View>
                            </Animated.View>)

                        : (
                            null
                        )
                }
                {this.props.children}
            </View>
        );
    }

    startAnimation() {
        if (this._start === true) {
            this.state.rotation.setValue(0);
            Animated.timing(this.state.rotation, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear
            }).start(() => this.startAnimation());
        }
    }


    loadingStart() {
        this._start = true;
        this.setState({ show: true });
        this.startAnimation();
        Animated.timing(this.state.animate, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear
        }).start();
    }

    loadingEnd() {
        this._start = false;
        this.setState({ show: false });
    }
}


export class Mask extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (isIphoneX()) {
            return (
                <SafeAreaView style={{
                    position: 'absolute',
                    width: SCREEN_WIDTH,
                    backgroundColor: '#FFFFFF',
                    zIndex: 1,
                    alignSelf: 'center',
                    height: SCREEN_HEIGHT
                }}
                >
                    {this.props.children}
                </SafeAreaView>
            );
        }
        return (
            <View style={{
                position: 'absolute',
                width: SCREEN_WIDTH,
                backgroundColor: '#FFFFFF',
                zIndex: 1,
                alignSelf: 'center',
                height: SCREEN_HEIGHT
            }}
            >
                <View style={{ height: 20 }} />
                {this.props.children}
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
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
