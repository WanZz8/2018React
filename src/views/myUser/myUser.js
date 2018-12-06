import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity, Platform
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { POST, GET } from '../../utils/request'; // 全屏宽高
import { formatDate } from '../../utils/tool';
import { SCREEN_WIDTH, HOST, QUOTE } from '../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height;
const IMG = require('../../img/404.jpg');

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

class UserInfo extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '我的用户',
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
            users: []
        };
    }

    getUser() {
        GET(`${HOST}/mine/unionUser.htm`).then((data) => {
            const mapple = data;
            this.setState({
                users: mapple.users
            });
        });
    }

    componentDidMount() {
        console.log(this.state.users);
        this.getUser();
    }

    renderHeader() {
        return (
            <View style={{
                backgroundColor: '#999999',
                paddingVertical: 10,
                flexDirection: 'row',
                flex: 1
            }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{
                        alignSelf: 'center'
                    }}
                    >
                       用户
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        alignSelf: 'center'
                    }}
                    >
                        当天交易
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        alignSelf: 'center'
                    }}
                    >
                        历史交易
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        alignSelf: 'center'
                    }}
                    >
                        注册时间
                    </Text>
                </View>
            </View>
        );
    }

    renderItem(item) {
        return (
            <View style={UserInfoStyles.fillStyle}>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        alignSelf: 'center'
                    }}
                    >
                        {item.username}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        alignSelf: 'center'
                    }}
                    >
                        {item.dayTradeVolume}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        alignSelf: 'center'
                    }}
                    >
                        {item.tradeVolume}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        alignSelf: 'center'
                    }}
                    >
                        {formatDate('y-m-d', { date: item.loginTime.time })}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={UserInfoStyles.root}>
                <FlatList
                    data={this.state.users}
                    renderItem={obj => this.renderItem(obj.item)}
                    keyExtractor={(item, index) => item.key}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }
}


const UserInfoStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        backgroundColor: '#FFF'
    },
    fillStyle: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 10
    }
});

export default UserInfo;
