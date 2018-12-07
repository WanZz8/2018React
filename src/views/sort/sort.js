import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Dimensions, Platform
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Icons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').width; // 全屏宽高
const hot = require('../../img/home/hot.png');

const RAISE = '#E84209';
const FALL = '#009900';

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


@inject('MainStore')
@observer
class Sort extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '排行榜',
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
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            isUp: true,
            isRest: false,
            arr: []
        };
    }

    componentDidMount() {
        const { params, data } = this.props.navigation.state.params;
        this.setState({
            arr: data
        });
        this.props.MainStore.getTrade(params);
    }

    handleSetUp() {
        this.setState({ isUp: true, isRest: false });
    }

    handleSetDown() {
        this.setState({ isUp: false, isRest: false });
    }

    handleSetRest() {
        this.setState({ isRest: true });
    }

    renderTade() {
        let idx1 = 0;
        let idx2 = 0;
        let idx3 = 0;
        const content = this.state.arr.map((item, idx) => {
            const priceColor = item.isUp
                ? RAISE
                : FALL;
            if (item.isOpen && item.isUp && this.state.isUp && !this.state.isRest) {
                idx1 += 1;
                return (
                    <TouchableOpacity
                        key={idx}
                        style={[SortStyles.positionContainer,
                            idx1 % 2 === 0
                                ? { backgroundColor: '#fff' }
                                : { backgroundColor: '#F8F7F4' }]}
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
            } if (item.isOpen && !item.isUp && !this.state.isUp && !this.state.isRest) {
                idx3 += 1;
                return (
                    <TouchableOpacity
                        key={idx}
                        style={[SortStyles.positionContainer,
                            idx3 % 2 === 0
                                ? { backgroundColor: '#fff' }
                                : { backgroundColor: '#F8F7F4' }]}
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
            } if (!item.isOpen && this.state.isRest) {
                idx2 += 1;
                return (
                    <TouchableOpacity
                        key={idx}
                        style={[SortStyles.positionContainer,
                            idx2 % 2 === 0
                                ? { backgroundColor: '#fff' }
                                : { backgroundColor: '#F8F7F4' }]}
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
                                {idx2}
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
            }
        });

        return content;
    }

    render() {
        return (
            <View style={SortStyles.root}>
                <View style={SortStyles.titleContainer}>
                    <View style={SortStyles.txtContainer}>
                        <Icons
                            name="ios-radio-button-on"
                            size={15}
                            style={{ width: 20, alignItems: 'center', marginLeft: 10 }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.handleSetUp();
                            }}
                            style={{ width: 65 }}
                        >
                            <Text style={this.state.isRest
                                ? SortStyles.active : this.state.isUp ? '' : SortStyles.active}
                            >
                                涨幅榜
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.handleSetDown();
                            }}
                            style={{ width: 65 }}
                        >
                            <Text style={this.state.isRest
                                ? SortStyles.active : this.state.isUp ? SortStyles.active : ''}
                            >
                                跌幅榜
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.handleSetRest();
                            }}
                            style={{ width: 65 }}
                        >
                            <Text style={this.state.isRest ? '' : SortStyles.active}>
                                休市榜
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={SortStyles.noContainer} />
                </View>
                {this.renderTade()}
            </View>
        );
    }
}

const SortStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        height,
        backgroundColor: '#ffffff',
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
        width,
        flexDirection: 'row',
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

export default Sort;
