import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Platform,
    Dimensions,
    SafeAreaView
} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';
import { SCREEN_WIDTH } from '../../../config/baseConfig';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const X_WIDTH = 375;
const X_HEIGHT = 812;
const RATIO = width / X_WIDTH;

function isIphoneX() {
    return (
        (Platform.OS === 'ios'
            && ((height === X_HEIGHT
                && width === X_WIDTH)
                || (height === X_WIDTH
                    && width === X_HEIGHT)))
        || Platform.OS === 'android'
    );
}

class Header extends Component {
    render() {
        if (isIphoneX()) {
            return (
                <SafeAreaView style={Tradeheaderstyles.container}>
                    <View style={Tradeheaderstyles.body}>
                        <Icons
                            name="ios-arrow-back"
                            style={[Tradeheaderstyles.back, { color: '#fff' }]}
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        />
                        <View style={Tradeheaderstyles.headerRoot}>
                            <TouchableHighlight onPress={() => { this.props.onPress(); }}>
                                <View style={{
                                    flexDirection: 'row',
                                }}
                                >
                                    <View>
                                        <Text style={Tradeheaderstyles.switchBtn}>
                                            {this.props.name}
                                        </Text>
                                        <Text style={{ alignSelf: 'center', color: '#F7C5B6' }}>
                                            {this.props.code}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={Tradeheaderstyles.listIcon}>
                            <TouchableOpacity
                                style={Tradeheaderstyles.positionTac}
                                onPress={() => {
                                    this.props.navigation.navigate('Rules');
                                }}
                            >
                                <Text style={{
                                    color: '#FFF',
                                    fontWeight: 'bold',
                                    fontSize: 14 * RATIO
                                }}
                                >
                                    规则
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            );
        }
        return (
            <View style={Tradeheaderstyles.container}>
                <View style={Tradeheaderstyles.body}>
                    <Icons
                        name="ios-arrow-back"
                        style={[Tradeheaderstyles.back, { color: '#FFF' }]}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    />
                    <View style={Tradeheaderstyles.headerRoot}>
                        <TouchableOpacity
                            onPress={() => { this.props.onPress(); }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10
                            }}
                            >
                                <View>
                                    <Text style={Tradeheaderstyles.switchBtn}>
                                        {this.props.name}
                                    </Text>
                                    <Text style={{ alignSelf: 'center', color: '#F7C5B6' }}>
                                        {this.props.code}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={Tradeheaderstyles.listIcon}>
                        <TouchableOpacity
                            style={Tradeheaderstyles.positionTac}
                            onPress={() => {
                                this.props.navigation.navigate('Rules');
                            }}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 14 * RATIO
                            }}
                            >
                                    规则
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    forward() {
        // this.props.navigation.navigate('Rules',
        //     {
        //         code: Contracts.total[this.props.commodity].code,
        //         contract: this.props.commodity
        //     });
    }

    componentWillUnmount() {
        // Schedule.removeEventListeners(this);
    }
}

const Tradeheaderstyles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        height: isIphoneX() ? 68 : 55,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    body: {
        flexDirection: 'row',
        flex: 1,
        height: isIphoneX() ? 68 : 55,
        alignItems: 'center'
    },
    back: {
        position: 'absolute',
        width: 40 * RATIO,
        height: isIphoneX() ? 68 : 55,
        fontSize: 24,
        color: '#000',
        left: 15,
        top: isIphoneX() ? 35 : 25,
        zIndex: 1
    },
    listIcon: {
        alignSelf: 'center',
        width: 50,
        flexDirection: 'row',
        height: isIphoneX() ? 64 : 55,
        marginRight: 5
    },
    positionTac: {
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: '#F7C5B6',
        height: 30,
        width: 50,
        marginTop: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 4
    },
    title: {
        width: SCREEN_WIDTH,
        color: '#000',
        fontSize: 17,
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1
    },
    btnStyle: {
        position: 'absolute',
        backgroundColor: '#25231D',
        right: 10,
        alignSelf: 'center',
        height: isIphoneX() ? 64 : 55,
        justifyContent: 'center'
    },
    btnBox: {
        alignSelf: 'center',
        width: 240 * RATIO,
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden'
    },
    switchBtn: {
        width: 120 * RATIO,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: '#F7C5B6',
        fontSize: 16,
        fontWeight: 'bold'
    },
    triangle: {
        position: 'absolute',
        zIndex: 1,
        right: 5,
        top: 10,
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 7,
        borderBottomWidth: 2,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#F7C5B6',
        borderBottomColor: 'transparent',
        alignSelf: 'center',
        marginLeft: 3
    },
    headerRoot: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rules: {
        fontSize: 15,
        color: '#F7C5B6'
    },
    selectorRoot: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default Header;
