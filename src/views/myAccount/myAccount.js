import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    Dimensions,
    DeviceEventEmitter,
    Platform,
    BackHandler, ToastAndroid
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Icons from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高
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
class MyAccount extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '账户中心',
        headerLeft: (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Mine');
                }}
                style={{
                    marginLeft: 15,
                    width: 25
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
            status: true,
            balance: '',
            show: false
        };
        this.renderLogin = this.renderLogin.bind(this);
    }

    componentWillMount() {
        console.log(this.props);
        const { gameBalance } = this.props.CacheStore;
        const { state } = this.props.navigation;
        this.setState({
            balance: gameBalance,
            status: this.props.CacheStore.isLogin,
            show: state.params.show
        });
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('KeyBack', (data) => {
            this.setState({
                show: data,
            });
        });

        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.handleRefresh);
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (nextProps.isLogin !== this.state.isLogin) {
            //
        }
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    handleRefresh = () => {
        console.log(this.props);
        const { state } = this.props.navigation;
        state.params.refresh();
    }

    // 点击加币
    async addSimBalance() {
        this.props.CacheStore.addSimBalance().then((res) => {
            Alert.alert('提示', res.resultMsg);
        });
    }

    // todo 退出
    logout() {
        Alert.alert('警告', '是否退出账号？', [
            { text: '取消', style: 'cancel' },
            {
                text: '确定',
                onPress: () => {
                    this.props.CacheStore.setLogout();
                    this.setState({ status: this.props.CacheStore.isLogin });
                }
            }
        ]);
    }

    renderLogin() {
        let that = this;
        return this.state.status ? (
            <View style={{
                width,
                alignItems: 'center',
                justifyContent: 'space-around'
            }}
            >
                <TouchableOpacity
                    onPress={() => this.logout()}
                    style={{
                        width: '82%',
                        borderRadius: 6,
                        borderWidth: 1,
                        height: 48,
                        borderColor: '#CD3A3C',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}
                >
                    <Text style={{ fontSize: 17, color: '#CD3A3C', alignSelf: 'center' }}>退出</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
                width: '88%',
                height: 42
            }}
            >
                <TouchableOpacity
                    style={{
                        borderColor: '#CD3A3C',
                        borderRadius: 6,
                        borderWidth: 1,
                        width: '42%',
                        height: 42,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        this.props.navigation.navigate(
                            'Login', {
                                refresh() {
                                    that.setState({
                                        status: true
                                    });
                                }
                            }
                        );
                    }}
                >
                    <Text style={{ fontSize: 17, color: '#CD3A3C' }}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderColor: '#CD3A3C',
                        borderRadius: 6,
                        borderWidth: 1,
                        width: '42%',
                        height: 42,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        this.props.navigation.navigate(
                            'Register'
                        );
                    }}
                >
                    <Text style={{ fontSize: 17, color: '#CD3A3C' }}>注册</Text>
                </TouchableOpacity>
            </View>
        );
    }


    render() {
        return (
            <View style={MyAccountStyle.root}>
                <View style={MyAccountStyle.mainContainer}>
                    <View style={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 55,
                        width: '90%',
                        backgroundColor: '#848ddc',
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        marginBottom: 25
                    }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 2
                        }}
                        >
                            <Image
                                source={require('../../img/mine/zuanshi.png')}
                                style={{
                                    height: 30,
                                    width: 30,
                                    marginHorizontal: 10
                                }}
                            />
                            <Text style={{
                                fontSize: 18,
                                color: '#F7C5B6',
                                fontWeight: 'bold',
                                flex: 1,
                                top: 5
                            }}
                            >
                                模拟币
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: 18,
                            color: '#F7C5B6',
                            fontWeight: 'bold',
                            flex: 2,
                        }}
                        >
                            {this.state.status ? this.state.balance : 0}
                            币
                        </Text>
                        <TouchableOpacity
                            style={{
                                borderRadius: 5,
                                marginRight: 10,
                                borderWidth: 1,
                                borderColor: '#F7C5B6',
                            }}
                            onPress={() => {
                                this.addSimBalance();
                            }}
                        >
                            <Text style={{
                                fontSize: 15,
                                color: '#F7C5B6',
                                width: 60,
                                textAlign: 'center'
                            }}
                            >
                                + 币
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 70,
                        width: '90%',
                        paddingHorizontal: 10,
                        borderRadius: 45,
                        marginBottom: 15
                    }}
                    >
                        <View style={{
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                        >
                            <Image
                                source={require('../../img/mine/transaction.png')}
                                style={{
                                    height: 30,
                                    width: 30,
                                    marginHorizontal: 10
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: 'left',
                                    flex: 1,
                                    color: '#373737'

                                }}
                            >
                                我的交易
                            </Text>

                        </View>
                        <View>
                            <Icons
                                name="ios-arrow-forward"
                                size={24}
                                color="#CD3A3C"
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 70,
                        width: '90%',
                        paddingHorizontal: 10,
                        borderRadius: 45,
                        marginBottom: 15
                    }}
                    >
                        <View style={{
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                        >
                            <Icons
                                name="ios-phone-portrait"
                                size={30}
                                color="#CD3A3C"
                                style={{
                                    height: 30,
                                    width: 30,
                                    marginHorizontal: 10
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 18,
                                    textAlign: 'left',
                                    flex: 1,
                                    color: '#373737'

                                }}
                            >
                                我的手机
                            </Text>

                        </View>
                        <View />
                    </View>
                </View>
                <View style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 55,
                    width,
                    paddingHorizontal: 10,
                    marginBottom: 100,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                >
                    {this.renderLogin()}
                </View>
            </View>
        );
    }
}

export default MyAccount;

const MyAccountStyle = StyleSheet.create({
    root: {
        flex: 1,
        width,
        height,
        backgroundColor: '#fff'
    },
    mainContainer: {
        width,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50
    }
});
