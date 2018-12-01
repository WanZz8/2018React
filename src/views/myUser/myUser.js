import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { POST, GET } from '../../utils/request'; // 全屏宽高
import { formatDate } from '../../utils/tool';
import { SCREEN_WIDTH, HOST, QUOTE } from '../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height;

class UserInfo extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '我的用户',
        tabBarIcon: ({ tintColor }) => (
            <Icons name="md-information-circle" size={25} color={tintColor} />
        ),
        headerTitleStyle: {
            alignSelf: 'center', fontSize: 18, color: '#fff', fontWeight: 'bold'
        },
        headerStyle: { height: 35, backgroundColor: '#292929' }
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
