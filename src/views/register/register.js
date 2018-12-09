import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    ImageBackground,
    Image,
    TextInput,
    Keyboard,
    Platform
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Icons from 'react-native-vector-icons/Ionicons';
import Verify from './subpage/verify';
import {
    HOST,
    DOMAIN, QUOTE
} from '../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高
const IMG = require('../../img/mine/lock.png');

const X_WIDTH = 375;
const X_HEIGHT = 812;

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

@inject('CacheStore')
class Register extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '注册',
        headerLeft: (
            <TouchableOpacity
                style={{
                    marginLeft: 15,
                    width: 25
                }}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Icons name="ios-arrow-back" size={25} color="#FFF" />
            </TouchableOpacity>),
        headerRight: (
            <View>
                <Text style={{
                    fontSize: 18,
                    color: '#fff',
                    fontWeight: 'bold',
                    marginRight: 10
                }}
                />
            </View>),
        headerTitleStyle: {
            alignSelf: 'center',
            flex: 1,
            textAlign: 'center',
            fontSize: 18,
            color: '#fff',
            fontWeight: 'bold'
        },
        headerStyle: {
            height: isIphoneX() ? 65 : 45,
            backgroundColor: '#292929',
            paddingTop: isIphoneX() ? 20 : 0,
            elevation: 0,
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: '',
            next: true,
            buttonState: true,
            reqAgain: 0,
            password: '',
            countdown: 0,
            name: '',
            code: '',
            keyboardHeight: 0
        };
        this._onChangeText = this._onChangeText.bind(this);
        this.changeCode = this.changeCode.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow.bind(this)
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide.bind(this)
        );
    }

    // 注销监听
    componentWillUnmount() {
        this.keyboardDidHideListener && this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
    }


    _keyboardDidShow(e) {
        this.setState({
            keyboardHeight: e.endCoordinates.height
        });
    }


    键盘收起后执行

    _keyboardDidHide(e) {
        this.setState({
            keyboardHeight: 0
        });
    }

    _onChangeText(text) {
        const newText = text.replace(/[^\d]+/, '');
        this.setState({
            mobileNumber: newText
        });
    }

    changeCode(text) {
        this.setState({
            code: text
        });
    }

    changeName(text) {
        this.setState({
            name: text
        });
    }

    changePassword(text) {
        this.setState({
            password: text
        });
    }

    // 发送验证码
    sendCode() {
        Keyboard.dismiss();
        if (this.state.countdown) return;
        if (!this.state.mobileNumber
            || !this.state.mobileNumber) return alert('请输入正确的手机号码');
        const reg = /(\+86|0086)?\s*1[34578]\d{9}/;
        if (reg.test(this.state.mobileNumber)) {
            this.alert.showVerify();
        } else {
            return Alert.alert('警告', '手机号码格式不正确');
        }
    }

    async submitVerifyCode({ mobile, code }) {
        try {
            let str = '';
            const data = {
                mobile,
                imageCode: code,
                action: 'sendCode',
            };
            str = '?';
            for (const [n, v] of Object.entries(data)) {
                str += `${n}=${v}&`;
            }
            let url = '/sso/register.htm';
            let res = await fetch(`${HOST}${url}${str}`, {
                method: 'POST'
            });
            if (res.status === 200) {
                let body = await res.text();
                body = JSON.parse(body);
                if (body.code === 200
                    || body.status === 200
                    || body.code === 0
                    || body.errorCode === 200
                    || body.errorCode === 0
                    || body.resultCode === 200
                    || body.resultCode === 0) {
                    this.setState({ buttonState: false });
                    this.setState({
                        countdown: 60
                    });
                } else {
                    Alert.alert('提示', body.errorMsg);
                }
            }
            this.countTime();
        } catch (e) {
            // Alert.alert('错误', e.errorMsg);
        }
    }


    /* 倒计时 */
    countTime() {
        if (this.state.countdown <= 0) {
            this.setState({ reqAgain: '获取验证码' });
        } else {
            let num = this.state.countdown--;
            this.setState({ reqAgain: `${num}s` });
        }

        if (this.state.countdown >= 0) {
            setTimeout(() => {
                this.countTime();
            }, 1000);
        }
    }

    /* 下一步 */
    async nextStep() {
        if (this.state.code === '') return alert('请输入验证码');
        if (this.state.code !== '') {
            try {
                let str = ''; const
                    data = {
                        action: 'verifyCode',
                        verifyCode: this.state.code
                    };
                str = '?';
                for (const [n, v] of Object.entries(data)) {
                    str += `${n}=${v}&`;
                }
                let url = '/sso/register.htm';
                let res = await fetch(`${HOST}${url}${str}`, {
                    method: 'POST'
                });
                if (res.status === 200) {
                    let body = await res.text();
                    body = JSON.parse(body);
                    console.log(body);
                    if (body.code === 200
                        || body.status === 200
                        || body.code === 0
                        || body.errorCode === 200
                        || body.errorCode === 0
                        || body.resultCode === 200
                        || body.resultCode === 0) {
                        this.setState({ next: false, buttonState: true, mobileNumber: '' });
                    }
                }
            } catch (err) {
                Alert.alert('Reminder', err.errorMsg);
            }
        }
    }

    /* 注册 */
    async submit() {
        if (this.state.name === null) return alert('请填写用户姓名');
        if (this.state.password == null) return alert('请填写密码');
        try {
            let str = ''; const
                data = {
                    action: 'register',
                    username: this.state.name,
                    password: this.state.password, // this._password
                };
            str = '?';
            for (const [n, v] of Object.entries(data)) {
                str += `${n}=${v}&`;
            }
            let url = '/sso/register.htm';
            let res = await fetch(`${HOST}${url}${str}`, {
                method: 'POST'
            });
            if (res.status === 200) {
                let body = await res.text();
                body = JSON.parse(body);
                console.log(body);
                if (body.code === 200
                    || body.status === 200
                    || body.code === 0
                    || body.errorCode === 200
                    || body.errorCode === 0
                    || body.resultCode === 200
                    || body.resultCode === 0) {
                    this.setState({
                        countdown: 60
                    });
                    this.props.navigation.navigate('Home');
                    this.props.CacheStore.getUserInfo();
                    this.props.CacheStore.setLogin(this.state.name, this.state.password);
                } else {
                    Alert.alert('提示', body.errorMsg);
                }
            }
        } catch (err) {
            Alert.alert('提示', err.errorMsg);
        }
    }

    render() {
        return (
            <View style={RegisterStyles.root}>
                <View style={RegisterStyles.mainContainer}>
                    <View style={{
                        flex: 1
                    }}
                    />
                    <View style={{
                        marginBottom: this.state.keyboardHeight,
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}
                    >
                        <View style={{
                            // flex: 1
                            marginBottom: 30,
                            width,
                            alignItems: 'center'
                        }}
                        >
                            <Image
                                source={IMG}
                                style={{
                                    width: 70,
                                    height: 80
                                }}
                            />
                            <View>
                                <Text style={{
                                    textAlign: 'center',
                                    marginTop: 20,
                                    fontSize: 20,
                                    marginBottom: 10,
                                    color: '#e99388'
                                }}
                                >
                                    注册
                                </Text>
                                <Text style={{ color: '#F7C5B6', textAlign: 'center' }}>
                                    请使用您的手机号码登录 / 注册
                                </Text>
                            </View>
                        </View>
                        {
                            this.state.next ? (
                                <View>
                                    <View style={{
                                        width,
                                        alignItems: 'center',
                                        height: 55,
                                        marginBottom: 30,
                                    }}
                                    >
                                        <TextInput
                                            style={{
                                                borderColor: '#EDF0F3',
                                                borderWidth: 1,
                                                borderRadius: 30,
                                                height: 55,
                                                width: '80%',
                                                paddingHorizontal: 10
                                            }}
                                            value={this.state.mobileNumber}
                                            onChangeText={this._onChangeText}
                                            placeholder="手机号"
                                            underlineColorAndroid="transparent"
                                        />
                                    </View>
                                    {
                                        this.state.buttonState ? (
                                            <View
                                                style={{
                                                    width,
                                                    alignItems: 'center',
                                                    height: 55,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={{
                                                        width: '80%',
                                                        backgroundColor: '#333',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-around',
                                                        height: 55,
                                                        borderRadius: 30
                                                    }}
                                                    onPress={this.sendCode}
                                                >
                                                    <Text style={{
                                                        color: '#fff',
                                                        fontSize: 18,
                                                        fontWeight: 'bold'
                                                    }}
                                                    >
                                                        获取验证码
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <View style={{
                                                width,
                                                height: 55,
                                                marginBottom: 30,
                                                alignItems: 'center',
                                                justifyContent: 'space-around',
                                            }}
                                            >
                                                <View style={{
                                                    width: '80%',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-around',
                                                    flexDirection: 'row',
                                                    height: 55,
                                                }}
                                                >
                                                    <TextInput
                                                        placeholder="输入验证码"
                                                        // style={[styles.textInput,
                                                        //     { width: 190, marginLeft: 30 }]}
                                                        // onChangeText={this.changeCode}
                                                        underlineColorAndroid="transparent"
                                                        style={{
                                                            borderColor: '#EDF0F3',
                                                            borderWidth: 1,
                                                            borderRadius: 30,
                                                            height: 55,
                                                            flex: 2.5,
                                                            marginRight: 10,
                                                            paddingHorizontal: 10
                                                        }}
                                                        onChangeText={this.changeCode}
                                                    />
                                                    <TouchableOpacity style={{
                                                        flex: 2,
                                                        marginLeft: 10
                                                    }}
                                                    >
                                                        <Text>
                                                            {this.state.reqAgain}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }
                                    <View
                                        style={{
                                            width,
                                            alignItems: 'center',
                                            height: 55,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                width: '80%',
                                                backgroundColor: '#333',
                                                alignItems: 'center',
                                                justifyContent: 'space-around',
                                                height: 55,
                                                borderRadius: 30
                                            }}
                                            onPress={this.nextStep}
                                        >
                                            <Text style={{
                                                color: '#fff',
                                                fontSize: 18,
                                                fontWeight: 'bold'
                                            }}
                                            >
                                                注册
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View>
                                    <View style={{
                                        width,
                                        alignItems: 'center',
                                        height: 55,
                                        marginBottom: 35,
                                    }}
                                    >
                                        <TextInput
                                            style={{
                                                borderColor: '#EDF0F3',
                                                borderWidth: 1,
                                                borderRadius: 30,
                                                height: 55,
                                                width: '80%',
                                                paddingHorizontal: 10
                                            }}
                                            onChangeText={this.changeName}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                            placeholder="请输入用户名"
                                        />
                                    </View>
                                    <View style={{
                                        width,
                                        alignItems: 'center',
                                        height: 55,
                                        marginBottom: 35,
                                    }}
                                    >
                                        <TextInput
                                            style={{
                                                borderColor: '#EDF0F3',
                                                borderWidth: 1,
                                                borderRadius: 30,
                                                height: 55,
                                                width: '80%',
                                                paddingHorizontal: 10
                                            }}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                            placeholder="密码"
                                            onChangeText={this.changePassword}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            width,
                                            alignItems: 'center',
                                            height: 55,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                width: '80%',
                                                backgroundColor: '#333',
                                                alignItems: 'center',
                                                justifyContent: 'space-around',
                                                height: 55,
                                                borderRadius: 30
                                            }}
                                            onPress={this.submit}
                                        >
                                            <Text style={{
                                                color: '#fff',
                                                fontSize: 18,
                                                fontWeight: 'bold'
                                            }}
                                            >
                                                注册
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                    <View style={{ flex: 3 }} />
                </View>
                <Verify
                    ref={(view) => { this.alert = view; }}
                    mobileNumber={this.state.mobileNumber}
                    submit={({ mobile, code }) => this.submitVerifyCode({ mobile, code })}
                />
            </View>
        );
    }
}

export default Register;

const RegisterStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        height,
        backgroundColor: '#fff'
    },
    mainContainer: {
        width,
        height,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
