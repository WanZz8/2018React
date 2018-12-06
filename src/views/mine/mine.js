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
    DeviceEventEmitter
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Icons from 'react-native-vector-icons/Ionicons';
import SafeBody from '../../common/safeView';
import { CHART_URL } from '../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高

const IMG = {
    personBg: require('../../img/mine/personBg.png'),
    fund: require('../../img/mine/list.png'),
    message: require('../../img/mine/message.png'),
    recom: require('../../img/mine/recom.png'),
    changePwd: require('../../img/mine/changePwd.png'),
    account: require('../../img/mine/account.png'),
    setting: require('../../img/mine/setting.png'),
    coin: require('../../img/mine/coinAdd.png'),
    person: require('../../img/mine/boy.png')
};

@inject('CacheStore')
class Mine extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            status: false,
            isLogin: false,
            show: false
        };
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('KeyBack', (data) => {
            this.setState({
                show: data,
            });
        });
    }


    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     if (nextProps.isLogin !== this.state.isLogin) {
    //         //
    //     }
    // }

    componentWillUnmount() {
        this.subscription.remove();
    }

    render() {
        let that = this;
        return (
            <SafeAreaView style={MineStyles.root} color="#F8F7F4">
                <ScrollView contentContainerStyle={{
                    width,
                    backgroundColor: '#F8F7F4'
                }}
                >
                    <View style={MineStyles.statusContainer}>
                        {/* 沉浸式状态栏 */}
                        {/* <StatusBar */}
                        {/* animated */}
                        {/* hidden={false} */}
                        {/* backgroundColor="transparent" */}
                        {/* translucent */}
                        {/* /> */}
                        <ImageBackground style={MineStyles.swiperContainer} source={IMG.personBg}>
                            <TouchableOpacity
                                style={MineStyles.viewImg}
                                onPress={
                                    () => {
                                        this.props.CacheStore.isLogin && this.state.show
                                            ? ''
                                            : this.props.navigation.navigate(
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
                                <View style={{
                                    backgroundColor: '#999',
                                    width: 60,
                                    borderRadius: 50,
                                    height: 60,
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}
                                >
                                    {
                                        this.props.CacheStore.isLogin && this.state.show ? (
                                            <Image
                                                source={IMG.person}
                                                style={{
                                                    width: 65,
                                                    height: 65
                                                }}
                                            />
                                        ) : <Icons name="ios-person" size={40} color="#fff" />
                                    }
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    // justifyContent: 'space-around'
                                }}
                                >
                                    {
                                        this.props.CacheStore.isLogin && this.state.show ? (
                                            <Text style={{
                                                marginTop: 15,
                                                color: '#f3f3f3',
                                                fontSize: 15
                                            }}
                                            >
                                                欢迎回来
                                            </Text>
                                        ) : [
                                            <Text
                                                style={{
                                                    marginTop: 10,
                                                    color: '#f3f3f3',
                                                    fontSize: 15
                                                }}
                                                key="ss11"
                                            >
                                                未登录
                                            </Text>,
                                            <Text
                                                style={{
                                                    marginTop: 5,
                                                    color: '#f3f3f3',
                                                    fontSize: 15
                                                }}
                                                key="ss12"
                                            >
                                                点击头像登录或者注册
                                            </Text>
                                        ]
                                    }
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={MineStyles.listContainer}>
                        {/* 资金明细

                        <TouchableOpacity
                            onPress={() => {}}
                            style={{
                                marginBottom: 10,
                                backgroundColor: '#fff'
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: 55
                            }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Image
                                        source={IMG.fund}
                                    />
                                    <Text style={{
                                        fontSize: 16
                                    }}
                                    >
                                        资金明细
                                    </Text>
                                </View>
                                <View style={{ flex: 2 }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#999999'
                                    }}
                                    >
                                        资金
                                    </Text>
                                    <Icons name="ios-arrow-forward" size={16} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        */}
                        {/* 消息中心

                        <TouchableOpacity
                            onPress={() => {}}
                            style={{
                                marginBottom: 15,
                                backgroundColor: '#fff'
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: 55
                            }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Image
                                        source={IMG.message}
                                    />
                                    <Text style={{
                                        fontSize: 16
                                    }}
                                    >
                                        消息中心
                                    </Text>
                                </View>
                                <View style={{ flex: 2 }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#999999'
                                    }}
                                    >
                                        消息
                                    </Text>
                                    <Icons name="ios-arrow-forward" size={16} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        */}
                        {/* 分享APP */}
                        <TouchableOpacity
                            onPress={
                                () => {
                                    this.props.navigation.navigate(
                                        'Share'
                                    );
                                }}
                            style={{
                                marginBottom: 20,
                                backgroundColor: '#fff'
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: 65
                            }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Image
                                        source={IMG.recom}
                                    />
                                    <Text style={{
                                        fontSize: 16
                                    }}
                                    >
                                        分享APP
                                    </Text>
                                </View>
                                <View style={{ flex: 2 }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#999999'
                                    }}
                                    >
                                        分享
                                    </Text>
                                    <Icons name="ios-arrow-forward" size={16} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* 修改密码 */}
                        <TouchableOpacity
                            onPress={
                                () => {
                                    this.props.navigation.navigate(
                                        'ChangePassword'
                                    );
                                }}
                            style={{
                                marginBottom: 20,
                                backgroundColor: '#fff'
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: 65
                            }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Image
                                        source={IMG.changePwd}
                                    />
                                    <Text style={{
                                        fontSize: 16
                                    }}
                                    >
                                        修改密码
                                    </Text>
                                </View>
                                <View style={{ flex: 2 }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#999999'
                                    }}
                                    >
                                        修改
                                    </Text>
                                    <Icons name="ios-arrow-forward" size={16} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* 我的用户 */}
                        <TouchableOpacity
                            onPress={
                                () => {
                                    this.props.navigation.navigate(
                                        'UserInfo'
                                    );
                                }
                            }
                            style={{
                                marginBottom: 20,
                                backgroundColor: '#fff'
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: 65
                            }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Image
                                        source={IMG.account}
                                    />
                                    <Text style={{
                                        fontSize: 16
                                    }}
                                    >
                                        我的用户
                                    </Text>
                                </View>
                                <View style={{ flex: 2 }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#999999'
                                    }}
                                    >
                                        用户
                                    </Text>
                                    <Icons name="ios-arrow-forward" size={16} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/* 账户设置
                        <TouchableOpacity
                            onPress={() => {}}
                            style={{
                                marginBottom: 10,
                                backgroundColor: '#fff'
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: 55
                            }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Image
                                        source={IMG.setting}
                                    />
                                    <Text style={{
                                        fontSize: 16
                                    }}
                                    >
                                        账户设置
                                    </Text>
                                </View>
                                <View style={{ flex: 2 }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#999999'
                                    }}
                                    >
                                        设置
                                    </Text>
                                    <Icons name="ios-arrow-forward" size={16} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        */}
                        {/* 自助加币 */}
                        <TouchableOpacity
                            onPress={
                                () => {
                                    this.props.CacheStore.isLogin && this.state.show
                                        ? this.props.navigation.navigate(
                                            'MyAccount', { show: this.state.show }
                                        ) : Alert.alert('提示', '请先登录', [
                                            {
                                                text: '确定',
                                                onPress: () => this.props.navigation.navigate(
                                                    'Login', {
                                                        refresh() {
                                                            that.setState({
                                                                status: true
                                                            });
                                                        }
                                                    }
                                                )
                                            }
                                        ]);
                                }}
                            style={{
                                marginBottom: 300,
                                backgroundColor: '#fff'
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: 65
                            }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Image
                                        source={IMG.coin}
                                    />
                                    <Text style={{
                                        fontSize: 16,
                                        top: 1
                                    }}
                                    >
                                        自助加币
                                    </Text>
                                </View>
                                <View style={{ flex: 2 }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    flex: 1
                                }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#999999'
                                    }}
                                    >
                                        0.00
                                    </Text>
                                    <Icons name="ios-arrow-forward" size={16} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const MineStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        backgroundColor: '#F8F7F4'
    },
    statusContainer: {
        //
    },
    mainContainer: {
        width
    },
    swiperContainer: {
        width,
        height: 155,
    },
    viewImg: {
        height: 140,
        width,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    listContainer: {
        marginTop: 25,
        backgroundColor: '#F8F7F4'
    },
    noticeCon: {
        width,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    IMGPNG: {
        width: 30,
        height: 30
    },
});


export default Mine;
