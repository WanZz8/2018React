import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    Platform,
    DeviceEventEmitter,
    Dimensions
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { inject } from 'mobx-react/native';
import { CHART_URL } from '../../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高
const addImg = require('../../../img/trade/addImg.png');

@inject('CacheStore')
class Controller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            isLogin: '',
            status: false,
            active: false
        };
    }

    componentWillMount() {
        const { account } = this.props.CacheStore;
        this.setState({
            balance: this.props.CacheStore.GameBalance,
            account,
            isLogin: this.props.CacheStore.isLogin
        });
    }

    // 点击加币
    async addSimBalance() {
        this.props.CacheStore.addSimBalance().then((res) => {
            Alert.alert('提示', res.resultMsg);
        });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.status !== this.state.status || nextProps.balance !== this.state.balance) {
            this.setState({
                status: nextProps.status,
                isLogin: nextProps.CacheStore.isLogin,
                balance: nextProps.CacheStore.GameBalance,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.status !== prevState.status || this.state.balance !== prevState.balance) {
            this.render();
        }
    }

    render() {
        let that = this;
        console.log(this.state.isLogin);
        console.log(this.state.status);
        return (
            <View style={ControllerStyles.controllerRoot}>
                {this.state.isLogin && this.state.status
                    ? [
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                width,
                                top: 10,
                                left: 5
                            }}
                            key="a1"
                        >
                            <Text style={{
                                flex: 1.5,
                                fontSize: 15,
                                marginLeft: 10
                            }}
                            >
                                模拟币
                            </Text>
                            <View style={{
                                flex: 2,
                                flexDirection: 'row'
                            }}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    color: '#C39D55',
                                    marginRight: 10
                                }}
                                >
                                    {this.state.isLogin && this.state.status
                                        ? this.state.balance
                                        : 0}
                                    币
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    this.addSimBalance();
                                }}
                                >
                                    <Image
                                        source={addImg}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={{
                                flex: 3
                            }}
                            />
                        </View>,
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                            key="a2"
                        >
                            {this.renderFootButton(
                                '常规下单',
                                'white',
                                '#CD3A3C',
                                () => {
                                    //
                                }
                            )}
                            {this.renderFootButton(
                                '我的持仓',
                                'white',
                                this.state.active ? '#C7C7CC' : '#CD3A3C',
                                () => {
                                    //
                                }
                            )}
                        </View>]
                    : (
                        <View style={ControllerStyles.controContainer}>
                            <TouchableOpacity
                                style={{
                                    width: 105,
                                    height: 33,
                                    backgroundColor: '#333',
                                    borderRadius: 4,
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'Login',
                                        {
                                            refresh() {
                                                that.props.refresh();
                                            }
                                        }
                                    );
                                }}
                            >
                                <Text style={{
                                    fontSize: 17,
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}
                                >
                                    登录
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: 105,
                                    height: 33,
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'Register'
                                    );
                                }}
                            >
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}
                                >
                                    注册
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        );
    }

    renderFootButton(title, textColor, bgColor, onPress) {
        return (
            <TouchableOpacity onPress={onPress} style={{ width: '27%' }}>
                <View style={{
                    height: 35,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: bgColor
                }}
                >
                    <Text style={{
                        color: textColor,
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}
                    >
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>

        );
    }
}

export default Controller;

const ControllerStyles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        fontSize: 14,
        marginHorizontal: 5
    },
    bar: {
        height: 36,
        borderTopColor: '#e1e1e1',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    barButtonWrap: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#e99388'
    },
    barButton: {
        height: 40,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 20
    },
    controllerRoot: {
        height: 128,
        backgroundColor: '#fff',
        width,
        justifyContent: 'space-around'
    },
    topWrapper: {
        height: 78,
        justifyContent: 'space-around'
    },
    buttonWrapper: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    volume: {
        alignSelf: 'center',
        fontSize: 14
    },
    volumeWrapper: {
        justifyContent: 'center'
    },
    contentWrapper: {
        height: 42,
        borderTopColor: '#e1e1e1',
        borderTopWidth: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    leftVolume: {
        flex: 3,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    rightVolume: {
        flex: 3,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    volumeLine: {
        height: 2,
        alignSelf: 'center'
    },
    index: {
        alignSelf: 'center',
        fontSize: 14,
        paddingHorizontal: 5,
        textAlign: 'center'
    },
    oneKeyTopupTouchanle: {
        backgroundColor: '#e99388',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 4
    },
    oneKeyTopupText: {
        color: '#000'
    },
    controContainer: {
        width,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        flex: 1
    }
});
