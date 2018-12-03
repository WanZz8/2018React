import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Easing,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
    ScrollView,
    Keyboard
} from 'react-native';

import {
    HOST,
    DOMAIN, QUOTE
} from '../../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高

class Verity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeInOpacity: new Animated.Value(0),
            verifyURL: `${HOST}/vf/verifyCode.jpg?_=${new Date()}`,
            isShow: false,
            heightOffset: new Animated.Value(height * 2),
            code: ''
        };
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 0.8,
            duration: 300
        }).start();
    }

    render() {
        if (this.state.isShow) {
            return (
                <Animated.View style={VerityStyles.root}>
                    <Animated.View style={[VerityStyles.background,
                        { opacity: this.state.fadeInOpacity }]}
                    />
                    <ScrollView style={VerityStyles.scrollViewBackground}>
                        <Animated.View style={[VerityStyles.contentRoot,
                            { marginTop: this.state.heightOffset }]}
                        >
                            <Text style={VerityStyles.titleText}>
                                请填写验证码
                            </Text>
                            <View style={VerityStyles.inputWrapper}>
                                <TextInput
                                    style={VerityStyles.codeInput}
                                    placeholder="输入验证码"
                                    value={this.state.code}
                                    underlineColorAndroid="transparent"
                                    onChangeText={text => this.setState({ code: text })}
                                />
                                <TouchableOpacity onPress={() => this.changeVerifyURL()}>
                                    <Image
                                        style={VerityStyles.verifyImage}
                                        source={{ uri: this.state.verifyURL }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={VerityStyles.descText}>
                                点击按钮以更换验证码
                            </Text>
                            <View style={VerityStyles.buttonsWrapper}>
                                <TouchableOpacity
                                    style={VerityStyles.button}
                                    onPress={() => this.submit()}
                                >
                                    <Text style={VerityStyles.buttonText}>
                                        确定
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={VerityStyles.button}
                                    onPress={() => this.cancel()}
                                >
                                    <Text style={VerityStyles.buttonText}>
                                        取消
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </ScrollView>
                </Animated.View>
            );
        }
        return (<View />);
    }

    showVerify() {
        this.setState({
            isShow: true,
            code: ''
        }, () => {
            Animated.timing(this.state.fadeInOpacity, {
                toValue: 0.8,
                duration: 200
            }).start();
            Animated.timing(this.state.heightOffset, {
                toValue: height / 2 - 183 / 2,
                duration: 200
            }).start();
        });
    }

    hideVerify() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 0,
            duration: 200
        }).start();
        Animated.timing(this.state.heightOffset, {
            toValue: height,
            duration: 200
        }).start(() => {
            this.setState({
                isShow: false
            });
        });
    }

    changeVerifyURL() {
        this.setState({
            verifyURL: `${HOST}/vf/verifyCode.jpg?_=${new Date()}`
        });
    }

    cancel() {
        Keyboard.dismiss();
        this.hideVerify();
    }

    submit() {
        Keyboard.dismiss();
        if (!this.state.code) {
            return Alert.alert('提示', '请填写验证码');
        }
        this.hideVerify();
        this.props.submit({ mobile: this.props.mobileNumber, code: this.state.code });
    }
}

const VerityStyles = StyleSheet.create({
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center'
    },
    background: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contentRoot: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        alignSelf: 'center',
        padding: 10
    },
    titleText: {
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: 16
    },
    inputWrapper: {
        borderColor: '#d52700',
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        padding: 10
    },
    codeInput: {
        flex: 1
    },
    verifyImage: {
        width: 70,
        height: 26
    },
    descText: {
        color: '#8F8E94',
        alignSelf: 'flex-end',
        marginTop: 10
    },
    buttonsWrapper: {
        flexDirection: 'row',

    },
    button: {
        backgroundColor: '#d43c43',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        margin: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    scrollViewBackground: {
        flex: 1
    }
});

export default Verity;
