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
    Image
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Icons from 'react-native-vector-icons/Ionicons';

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
    coin: require('../../img/mine/coinAdd.png')
};

class Mine extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={MineStyles.root}>
                <ScrollView>
                    <View style={MineStyles.statusContainer}>
                        <StatusBar
                            animated
                            hidden={false}
                            backgroundColor="transparent"
                            translucent
                        />
                        <ImageBackground style={MineStyles.swiperContainer} source={IMG.personBg}>
                            <TouchableOpacity
                                style={MineStyles.viewImg}
                                onPress={
                                    () => {
                                        this.props.navigation.navigate(
                                            'Login'
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
                                    <Icons name="ios-person" size={40} color="#fff" />
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    // justifyContent: 'space-around'
                                }}
                                >
                                    <Text style={{
                                        marginTop: 10,
                                        color: '#f3f3f3',
                                        fontSize: 15
                                    }}
                                    >
                                        未登录
                                    </Text>
                                    <Text style={{
                                        marginTop: 5,
                                        color: '#f3f3f3',
                                        fontSize: 15
                                    }}
                                    >
                                        点击头像登录或者注册
                                    </Text>
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
                                    this.props.navigation.navigate(
                                        'MyAccount'
                                    );
                                }}
                            style={{
                                marginBottom: 10,
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
            </View>
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
        // backgroundColor: '#fff'
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
