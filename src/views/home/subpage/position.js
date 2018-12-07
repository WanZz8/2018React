// 独立行情模块
import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import { observer, inject } from 'mobx-react';
import Icons from 'react-native-vector-icons/Ionicons';
import LoadingView from '../../../common/LoadingView';

const width = Dimensions.get('window').width; // 全屏宽高
const hot = require('../../../img/home/hot.png');

const RAISE = '#E84209';
const FALL = '#009900';

@inject('MainStore')
@observer
class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRest: false,
            params: '',
            arr: []
        };
        this.renderTrade = this.renderTrade.bind(this);
    }

    componentDidMount() {
        // console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (nextProps) {
            this.setState({
                params: nextProps.params,
                arr: nextProps.arr
            });
        }
    }

    componentDidUpdate() {
        if (this.state.params) {
            // console.log(this.state.params);
            // console.log(this.state.arr);
            // setTimeout(() => { console.log(this.state.arr); }, 6000);
            this.props.MainStore.getTrade(this.state.params);
        }
    }

    handleActive(status) {
        this.setState({
            isRest: status
        });
    }

    renderLoading = () => <LoadingView />;

    renderTrade() {
        let idx1 = 0;
        let idx3 = 0;
        const content = this.state.arr.map((item, idx) => {
            const priceColor = item.isUp
                ? RAISE
                : FALL;

            if (item.isOpen && !this.state.isRest) {
                idx1 += 1;
                return (
                    <TouchableOpacity
                        key={idx}
                        style={[PositionStyles.positionContainer,
                            idx1 % 2 === 0
                                ? { backgroundColor: '#fff' }
                                : { backgroundColor: '#F8F7F4' }]}
                        onPress={
                            () => {
                                this.props.navigation.navigate(
                                    'Trede', { data: item }
                                );
                            }}
                    >
                        <View style={[{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            height: 50,
                            flex: 1.5
                        }]}
                        >
                            <Text style={{
                                width: 25,
                                color: '#000',
                                textAlign: 'center',
                                fontSize: 16,
                                // fontWeight: 'bold'
                            }}
                            >
                                {idx1}
                            </Text>
                            <Text style={{
                                flex: 4,
                                color: '#000',
                                fontSize: 14,
                                textAlign: 'left',
                                fontWeight: 'bold'
                            }}
                            >
                                {item.name}
                            </Text>
                            {this.props.MainStore.isHot(item.code) ? (
                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={hot}
                                        style={{
                                            width: 12,
                                            height: 13,
                                        }}
                                    />
                                </View>
                            ) : []}
                            {this.props.MainStore.isNew(item.code) ? (
                                <View style={{
                                    // flex: 2
                                    left: 5,
                                    width: 50,
                                    backgroundColor: '#00b38f',
                                    alignItems: 'center',
                                    borderRadius: 3
                                }}
                                >
                                    <Text style={{
                                        // flex: 2
                                        color: '#fff'
                                    }}
                                    >
                             NEW
                                    </Text>
                                </View>
                            ) : []}
                        </View>
                        <View style={{
                            flex: 2
                        }}
                        >
                            <Text style={{
                                textAlign: 'center',
                                color: priceColor,
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}
                            >
                                {item.price}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'space-around'
                        }}
                        >
                            <View style={{
                                backgroundColor: item.isUp ? '#E13628' : '#00b38f',
                                width: '80%',
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: item.isUp ? RAISE : FALL,
                            }}
                            >
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    height: 30,
                                    lineHeight: 30,
                                }}
                                >
                                    {item.rate}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            } if (!item.isOpen && this.state.isRest) {
                idx3 += 1;
                return (
                    <TouchableOpacity
                        key={idx}
                        style={[PositionStyles.positionContainer,
                            idx3 % 2 === 0
                                ? { backgroundColor: '#fff' }
                                : { backgroundColor: '#F8F7F4' }]}
                        onPress={
                            () => {
                                this.props.navigation.navigate(
                                    'Trede', { data: item }
                                );
                            }}
                    >
                        <View style={[{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            height: 50,
                            flex: 1.3
                        }]}
                        >
                            <Text style={{
                                width: 25,
                                color: '#000',
                                textAlign: 'center',
                                fontSize: 16,
                                // fontWeight: 'bold'
                            }}
                            >
                                {idx3}
                            </Text>
                            <Text style={{
                                flex: 4,
                                color: '#000',
                                fontSize: 14,
                                textAlign: 'left',
                                fontWeight: 'bold'
                            }}
                            >
                                {item.name}
                            </Text>
                            {this.props.MainStore.isHot(item.code) ? (
                                <View style={{ flex: 1 }}>
                                    <Image
                                        source={hot}
                                        style={{
                                            width: 12,
                                            height: 13,
                                        }}
                                    />
                                </View>
                            ) : []}
                            {this.props.MainStore.isNew(item.code) ? (
                                <View style={{
                                    // flex: 2
                                    left: 5,
                                    width: 50,
                                    backgroundColor: '#00b38f',
                                    alignItems: 'center',
                                    borderRadius: 3
                                }}
                                >
                                    <Text style={{
                                        // flex: 2
                                        color: '#fff'
                                    }}
                                    >
                             NEW
                                    </Text>
                                </View>
                            ) : []}
                        </View>
                        <View style={{
                            flex: 2
                        }}
                        >
                            <Text style={{
                                textAlign: 'center',
                                color: priceColor,
                                fontSize: 17,
                                fontWeight: 'bold'
                            }}
                            >
                                {item.price}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'space-around'
                        }}
                        >
                            <View style={{
                                backgroundColor: '#333333',
                                width: '80%',
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: '#333333',
                            }}
                            >
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    height: 30,
                                    lineHeight: 30,
                                }}
                                >
                                    休市
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }
        });

        return content;
    }

    render() {
        // const me = this;
        let idx1 = 0;
        let idx3 = 0;

        return (
            <View style={PositionStyles.root}>
                <View style={PositionStyles.titleContainer}>
                    <View style={PositionStyles.txtContainer}>
                        <Icons
                            name="ios-radio-button-on"
                            size={15}
                            style={{ flex: 1, alignItems: 'center', marginLeft: 10 }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.handleActive(false);
                            }}
                            style={{ flex: 2, alignItems: 'flex-start' }}
                        >
                            <Text style={this.state.isRest ? PositionStyles.active : []}>
                                开市
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.handleActive(true);
                            }}
                            style={{ flex: 2, alignItems: 'flex-start' }}
                        >
                            <Text style={!this.state.isRest ? PositionStyles.active : []}>
                                休市
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={PositionStyles.noContainer} />
                </View>
                {this.renderTrade()}
                <View style={PositionStyles.bottomContainer}>
                    <Text style={{
                        // paddingVertical: 3,
                        lineHeight: 20
                    }}
                    >
                        交易由纽约商业、商品交易所及香港交易所等实盘对接。
                    </Text>
                    <Text style={{
                        lineHeight: 20
                    }}
                    >
                        本产品属于高风险、高收益投资品种；投资者应具有较高的风险识别能力、资金实力与风险承受能力。
                    </Text>
                </View>
            </View>
        );
    }
}

export default Position;

const PositionStyles = StyleSheet.create({
    root: {
        marginTop: 20,
    },
    titleContainer: {
        backgroundColor: '#ffffff',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width
    },
    txtContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    noContainer: {
        flex: 2,
    },
    active: {
        color: '#999'
    },
    bannerImg: {
        height: 150,
        width,
    },
    scrollContainer: {
        // backgroundColor: '#ffffff',
        width
    },
    noticeCon: {
        width,
        height: 50,
    },
    noticeIcon: {
        flex: 1,
        alignItems: 'center'
    },
    noticeContent: {
        flex: 6,
        height: 50
    },
    noticeMore: {
        flex: 1.8,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    MsgContainer: {
        // 资讯盒子
        marginTop: 10,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: '#ffffff',
    },
    MsgBox: {
        // 单个盒子
        backgroundColor: '#ffffff',
        marginHorizontal: 5,
        height: 85,
        flex: 1,
        borderRadius: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    IMGPNG: {
        width: 30,
        height: 30
    },
    positionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width
    },
    bottomContainer: {
        width,
        // alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: '#F4F4F4',
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});
