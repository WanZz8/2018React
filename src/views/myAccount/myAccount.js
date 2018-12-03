import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    Dimensions
} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高

class MyAccount extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '账户中心',
        headerLeft: (
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    marginLeft: 5,
                    width: 20
                }}
            >
                <Icons name="ios-arrow-back" size={25} color="#FFF" />
            </TouchableOpacity>),
        headerTitleStyle: {
            alignSelf: 'center', fontSize: 18, color: '#fff', fontWeight: 'bold'
        },
        headerStyle: { height: 35, backgroundColor: '#000' }
    });

    constructor(props) {
        super(props);
        this.state = {
            status: true
        };
        this.renderLogin = this.renderLogin.bind(this);
    }

    renderLogin() {
        return this.state.status ? (
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
                            'Login'
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
        ) : (
            <View>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={{ fontSize: 17, color: '#CD3A3C', alignSelf: 'center' }}>退出</Text>
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
                                lineHeight: 25,
                                flex: 1
                            }}
                            >
                                模拟币
                            </Text>
                        </View>
                        <Text style={{
                            fontSize: 18,
                            color: '#F7C5B6',
                            fontWeight: 'bold',
                            lineHeight: 25,
                            flex: 2,
                        }}
                        >
                            011111111币
                        </Text>
                        <TouchableOpacity
                            style={{
                                lineHeight: 25,
                                borderRadius: 5,
                                marginRight: 10,
                                borderWidth: 1,
                                borderColor: '#F7C5B6',
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
