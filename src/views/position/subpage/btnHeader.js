import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Platform, Dimensions
} from 'react-native';

import { withNavigation } from 'react-navigation';

import Icons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高
const X_WIDTH = 375;
const RATIO = height / X_WIDTH;

const X_HEIGHT = 812;

const HAS_CRYPTO = false;

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
/**
 * pop - 返回导航器顶端
 * special - 返回特定页面
 * button {name:按钮名字,btnStyle:按钮样式}
 */
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (isIphoneX()) { /* 根据不同设备头部显示不同 */
            return (
                <View style={btnStyles.container}>
                    <View style={btnStyles.body}>
                        <Icons
                            name="ios-arrow-back"
                            style={btnStyles.back}
                            onPress={() => {
                                if (this.props.pop) {
                                    this.props.navigation.popToTop();
                                } else if (this.props.special !== undefined) {
                                    this.props.navigation.navigate(this.props.special);
                                } else {
                                    this.props.navigation.goBack();
                                }
                            }}
                        />
                        <View style={btnStyles.selectionRootView}>
                            {/* 根据调用的模块 传值显示点击按钮 */}
                            <View style={styles.btnBox}>
                                {
                                    this.props.btnName.map(item => (
                                        <TouchableHighlight onPress={() => {
                                            this.props.onPress(item.type);
                                        }}
                                        >
                                            <Text style={[btnStyles.switchBtn,
                                                item.type === this.props.showType
                                                    ? { backgroundColor: '#e99388' }
                                                    : { color: '#e99388' }]}
                                            >
                                                {'FK'}
                                            </Text>
                                        </TouchableHighlight>
                                    ))
                                }
                            </View>
                        </View>
                        {/* 部分页面有右边按钮,只需调用页面写button 可调用 */}
                        {this.props.button ? (
                            <TouchableHighlight
                                style={btnStyles.btnStyle}
                                onPress={() => this.forward()}
                            >
                                <Text style={styles.buttonName}>
                                    { 'FK'}
                                </Text>
                            </TouchableHighlight>
                        ) : (null)}
                    </View>
                </View>
            );
        }
        return (
            <View style={btnStyles.container}>
                <View style={btnStyles.heightOffset} />
                <View style={btnStyles.body}>
                    <Icons
                        name="ios-arrow-back"
                        style={btnStyles.back}
                        onPress={() => {
                            if (this.props.pop) {
                                this.props.navigation.popToTop();
                            } else if (this.props.special !== undefined) {
                                this.props.navigation.navigate(this.props.special);
                            } else {
                                this.props.navigation.goBack();
                            }
                        }}
                    />
                    <View style={btnStyles.selectionRootView}>
                        {/* 根据调用的模块 传值显示点击按钮 */}
                        <View style={btnStyles.btnBox}>
                            {
                                this.props.btnName.map(item => (
                                    <TouchableHighlight onPress={() => {
                                        this.props.onPress(item.type);
                                    }}
                                    >
                                        <Text style={[btnStyles.switchBtn,
                                            item.type === this.props.showType
                                                ? { backgroundColor: '#e99388' }
                                                : { color: '#e99388' }]}
                                        >
                                            {'FK'}
                                        </Text>
                                    </TouchableHighlight>
                                ))
                            }
                        </View>
                    </View>
                    {/* 部分页面有右边按钮,只需调用页面写button 可调用 */}
                    {this.props.button ? (
                        <TouchableHighlight style={btnStyles.btnStyle} onPress={() => this.forward()}>
                            <Text style={btnStyles.buttonName}>
                                { 'FK'}
                            </Text>
                        </TouchableHighlight>
                    ) : (null)}
                </View>
            </View>
        );
    }

    forward() {
        if (this.props.button) {
            this.props.navigation.navigate(this.props.button.forward, { take: this.props.button.take });
        }
    }
}

const btnStyles = StyleSheet.create({
    rowStyle: {
        flexDirection: 'row',
    },
    heightOffset: {
        height: 20
    },
    fillStyle: {
        flex: 1
    },
    centerView: {
        alignSelf: 'center'
    },
    whiteBackground: {
        backgroundColor: '#fff'
    },
    container: {
        backgroundColor: '#25231D',
        height: 64,
        flexDirection: 'column',
        alignItems: 'center'
    },
    body: {
        flexDirection: 'row',
        flex: 1
    },
    back: {
        position: 'absolute',
        alignSelf: 'center',
        width: 40,
        height: isIphoneX() ? 64 : 44,
        lineHeight: isIphoneX() ? 64 : 44,
        fontSize: 24,
        color: '#000',
        left: 8,
        zIndex: 1
    },
    title: {
        width,
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
        height: isIphoneX() ? 64 : 44,
        justifyContent: 'center'
    },
    btnBox: {
        alignSelf: 'center',
        width: 240,
        borderWidth: 1,
        borderColor: '#e99388',
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden'
    },
    switchBtn: {
        width: 100,
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 18
    },
    selectionRootView: {
        flex: 1, justifyContent: 'center'
    },
    buttonName: {
        fontSize: 15,
        color: '#F7C5B6'
    }
});

export default withNavigation(App);
