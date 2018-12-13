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
    SafeAreaView,
    TextInput,
    DeviceEventEmitter,
    Platform,
    Keyboard
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Icons from 'react-native-vector-icons/Ionicons';
import SafeBody from '../../common/safeView';
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
class Login extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '登录',
        headerLeft: (
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    marginLeft: 15,
                    width: 25
                }}
            >
                <Icons name="ios-arrow-back" size={25} color="#FFF" />
            </TouchableOpacity>),
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 18,
            color: '#fff',
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center'
        },
        headerStyle: {
            height: isIphoneX() ? 65 : 45,
            backgroundColor: '#292929',
            elevation: 0,
            paddingTop: isIphoneX() ? 20 : 0,
        },
        headerRight: (
            <TouchableOpacity
                onPress={() => {
                    navigation.state.params.handleShare();
                }}
            >
                <Text style={{
                    fontSize: 18,
                    color: '#fff',
                    fontWeight: 'bold',
                    marginRight: 10
                }}
                >
                    注册
                </Text>
            </TouchableOpacity>)
    });

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            keyboardHeight: 0
        };
        this.onActionSelected = this.onActionSelected.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow.bind(this)
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide.bind(this)
        );
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleShare: this.onActionSelected });
    }

    // 注销监听
    componentWillUnmount() {
        this.keyboardDidHideListener && this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
    }


    键盘弹起后执行

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

    onActionSelected() {
        this.props.navigation.navigate(
            'Register'
        );
    }

    onChangeText(text) {
        const newText = text.replace(/[^\d]+/, '');
        this.setState({
            account: newText
        });
    }

    onChangePassword(text) {
        this.setState({
            password: text
        });
    }

    async login() {
        let jpush = this.props.CacheStore.jpush;
        // console.log(jpush);
        let str = ''; const
            data = {
                mobile: this.state.account,
                password: this.state.password,
                jpush,
            };
        str = '?';
        for (const [n, v] of Object.entries(data)) {
            str += `${n}=${v}&`;
        }
        let url = '/sso/user_login_check';
        if (this.state.account && this.state.password) {
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
                    this.props.CacheStore.setLogin(this.state.account, this.state.password);
                    this.props.CacheStore.update();
                    this.props.CacheStore.getScheme();
                    this.props.CacheStore.getUserInfo();
                    const { goBack, state } = this.props.navigation;
                    state.params.refresh();
                    DeviceEventEmitter.emit('KeyBack', true);
                    goBack();
                } else {
                    Alert.alert('提示', body.errorMsg);
                }
            }
        } else if (!this.state.account) {
            Alert.alert('请输入手机号');
        } else if (!this.state.password) {
            Alert.alert('请输入密码');
        }
    }

    render() {
        return (
            <SafeAreaView style={[LoginStyles.root]}>
                <View style={[LoginStyles.mainContainer]}>
                    <View style={{
                        flex: 2
                    }}
                    />
                    <View style={{
                        // flex: 6,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginBottom: this.state.keyboardHeight
                    }}
                    >
                        <View style={{
                            // flex: 1
                            marginBottom: 50,
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
                        </View>
                        <View
                            style={{
                                width,
                                alignItems: 'center',
                                height: 55,
                                marginBottom: 30,
                            }}
                            behavior="padding"
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
                                placeholder="手机号"
                                autoCapitalize="none"
                                value={this.state.account}
                                underlineColorAndroid="transparent"
                                // onChangeText={(text) => {
                                //     text.length > 0
                                // ? this.setState({ buttonColor: true })
                                // : this.setState({ buttonColor: false });
                                //     this._address = text;
                                // }}
                                keyboardType="numeric"
                                onChangeText={this.onChangeText}
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
                                    paddingHorizontal: 10,
                                }}
                                placeholder="密码"
                                underlineColorAndroid="transparent"
                                // onChangeText={(text) => {
                                //     text.length > 0
                                // ? this.setState({ buttonColor: true })
                                // : this.setState({ buttonColor: false });
                                //     this._address = text;
                                // }}
                                autoCapitalize="none"
                                value={this.state.password}
                                onChangeText={this.onChangePassword}
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
                                onPress={this.login}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}
                                >
                                        登录
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* 忘记密码
                           <View style={{
                            width,
                            alignItems: 'center',
                            height: 55,
                            marginBottom: 30,
                        }}
                        >
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    width: '50%',
                                    height: 35,
                                }}
                                onPress={
                                    () => {
                                        this.props.navigation.navigate(
                                            'Forget'
                                        );
                                    }}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#4b4b4b'
                                }}
                                >
                                    忘记密码
                                </Text>
                            </TouchableOpacity>
                        </View>

                        */}
                    </View>
                    <View style={{ flex: 3 }} />
                </View>
            </SafeAreaView>
        );
    }
}

export default Login;

const LoginStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        height,
        backgroundColor: '#fff'
    },
    // bg: {
    //     height: isIphoneX() ? 27 : 27,
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     backgroundColor: '#000',
    // },
    statusBarContainer: {
        // alignItems: 'center'
    },
    mainContainer: {
        width,
        height,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
