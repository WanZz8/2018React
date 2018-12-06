import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight, Platform
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { SCREEN_WIDTH } from '../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高

const IMG = require('../../img/404.jpg');

const X_WIDTH = 375;
const RATIO = height / X_WIDTH;
const RAISE = '#E84209';
const FALL = '#009900';
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

class Order extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '模拟交易',
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
            balance: '',
            contract: '',
            volumeList: [],
            buy: '',
            stopLossList: [],
            stopProfitList: []

        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        // this.getNewsInfo(0);
    }

    selectVolume(o) {
        const stopLoss = this.state.stopLossList.map(e => e.mul(o));
        const stopProfit = this.state.stopProfitList.map(e => e.mul(o));
        this._stopProfitListUpdate = stopProfit;

        this.setState({
            volume: o,
            stopLossList: stopLoss,
            stopLoss: stopLoss[this._stopLossIndex],
            stopProfit: stopProfit[this._stopLossIndex],
            chargeUnit: this._chargeUnit.mul(o)
        });
    }

    selectStopLoss(i) {
        this._stopLossIndex = i;
        this.setState({
            stopLoss: this.state.stopLossList[i],
            stopProfit: this._stopProfitListUpdate[i]
        });
    }

    async submit() {
        this.props.navigation.navigate('Position');
    }

    render() {
        const submitButtonColor = this.state.buy ? RAISE : FALL;
        return (
            <View style={OrderStyle.root}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                        <Text style={{
                            color: '#F7C5B6',
                            marginLeft: 8,
                            fontSize: 15,
                            alignSelf: 'center'
                        }}
                        >
                            模拟余额
                        </Text>
                        <Text style={{
                            color: '#F7C5B6',
                            marginLeft: 8,
                            fontSize: 20
                        }}
                        >
                            14833
                        </Text>
                    </View>

                    <View style={{
                        borderTopColor: '#eeeff0',
                        borderBottomColor: '#eeeff0',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'space-between'
                    }}
                    >
                        <Text style={{
                            color: '#F7C5B6',
                            marginLeft: 8,
                            fontSize: 17,
                            alignSelf: 'center',
                            flex: 1.2
                        }}
                        >
                            CL1901
                        </Text>
                        <Text style={{
                            marginRight: 8,
                            fontSize: 16,
                            alignSelf: 'center',
                            flex: 2.55,
                            color: '#F7C5B6',
                            textAlign: 'right'
                        }}
                        >
                            自动平仓时间
                        </Text>
                    </View>
                    <View style={{
                        borderTopColor: '#eeeff0',
                        borderBottomColor: '#eeeff0',
                        borderTopWidth: 1,
                        borderBottomWidth: 1
                    }}
                    >
                        <Text style={{
                            color: '#F7C5B6',
                            marginLeft: 8,
                            fontSize: 16,
                            height: 40,
                            lineHeight: 40
                        }}
                        >
                            交易手数
                        </Text>
                        <View style={{
                            paddingHorizontal: 8,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginBottom: 10
                        }}
                        >
                            {this.state.volumeList.map(o => (
                                <TouchableHighlight
                                    onPress={() => this.selectVolume(o)}
                                    activeOpacity={1}
                                    underlayColor="transparent"
                                    style={[OrderStyle.btn,
                                        this.state.volume === o
                                            ? {
                                                backgroundColor: '#e99388'
                                            } : null]}
                                >
                                    <Text style={[{ alignSelf: 'center' },
                                        { color: this.state.volume === o ? '#000' : '#F7C5B6' }]}
                                    >
                                        {o}
                                    </Text>
                                </TouchableHighlight>
                            ))}
                        </View>
                    </View>

                    <View style={{
                        borderTopColor: '#eeeff0',
                        borderBottomColor: '#eeeff0',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'space-between'
                    }}
                    >
                        <Text style={{
                            color: '#F7C5B6',
                            marginLeft: 8,
                            fontSize: 16,
                            alignSelf: 'center'
                        }}
                        >
                            设定止盈
                        </Text>
                        <View style={{
                            paddingHorizontal: 8,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                        >
                            {
                                this.state.stopLossList.map((o, i) => (
                                    <TouchableHighlight
                                        onPress={() => this.selectStopLoss(i)}
                                        activeOpacity={1}
                                        underlayColor="transparent"
                                        style={[OrderStyle.btn,
                                            { minWidth: 70 }, this.state.stopLoss === o
                                                ? {
                                                    backgroundColor: '#e99388'
                                                } : null,
                                            this.state.stopLossList.length === i + 1
                                                ? { marginRight: 0 }
                                                : null]}
                                    >
                                        <Text style={[{
                                            alignSelf: 'center'
                                        }, {
                                            color: this.state.stopLoss === o
                                                ? '#000'
                                                : '#F7C5B6'
                                        }]}
                                        >
                                            {o}
                                        </Text>
                                    </TouchableHighlight>
                                ))
                            }
                        </View>
                    </View>
                    <View style={[{
                        borderTopColor: '#eeeff0',
                        borderBottomColor: '#eeeff0',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'space-between'
                    }]}
                    >
                        <Text style={[{
                            color: '#F7C5B6',
                            marginLeft: 8,
                            fontSize: 16,
                            alignSelf: 'center'
                        }]}
                        >
                            设定止盈
                        </Text>
                        <View style={[{
                            marginRight: 8,
                            alignSelf: 'center',
                            minWidth: 70,
                            // backgroundColor: GRID_LINE_COLOR,
                            borderRadius: 4
                        }]}
                        >
                            <Text style={{
                                fontSize: 17,
                                color: '#e99388', // DATE_FONT_COLOR,
                                textAlign: 'center',
                                height: 30,
                                lineHeight: 30
                            }}
                            >
                                5950
                            </Text>
                        </View>
                    </View>
                    <TouchableHighlight
                        style={[{
                            backgroundColor: '#e99388',
                            width: Math.min(355 * RATIO, 355),
                            height: 44,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderRadius: 8,
                            marginTop: 24
                        }, { backgroundColor: submitButtonColor }]}
                        onPress={() => this.submit()}
                        activeOpacity={1}
                        underlayColor="#d43c43"
                    >
                        <Text style={[{
                            color: '#000',
                            fontSize: 16,
                            alignSelf: 'center'
                        }]}
                        >
                            {this.state.buy ? '买涨' : '买跌'}
                        </Text>
                    </TouchableHighlight>
                    <View style={{ height: 10 }} />
                </ScrollView>
            </View>
        );
    }
}

export default Order;

const OrderStyle = StyleSheet.create({
    root: {
        flex: 1,
        width,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    imgContainer: {
        resizeMode: 'stretch',
    },
    viewTxt: {
        fontSize: 20
    },
    btn: {
        minWidth: 60,
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#e99388',
        borderWidth: 1,
        borderRadius: 4,
        margin: 4,
        paddingHorizontal: 10
    },
});
