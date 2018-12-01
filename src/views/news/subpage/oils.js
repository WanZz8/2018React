import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    FlatList,
    Alert,
    View,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    Image, Dimensions
} from 'react-native';


// import HTML from 'react-native-render-html';
// import Config, { DOMAIN } from '../../../config';
import { POST, GET } from '../../../utils/request';
import { SCREEN_WIDTH, HOST, QUOTE } from '../../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高

const IMG = require('../../../img/home/lightning.png');

const X_WIDTH = 375;
const RATIO = width / X_WIDTH;

// 原油

class Oil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            refreshing: false,
            onLoading: false,
            showFoot: 2, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2：显示加载中
        };
    }

    componentDidMount() {
        this.getNewsInfo(0);
    }

    renderLoadingView() {
        return (
            <View style={financeStyle.LoadingCon}>
                <ActivityIndicator
                    animating
                    color="red"
                    size="large"
                />
            </View>
        );
    }


    async getNewsInfo(type, date) {
        const result = await GET(`${HOST}/news/newsList.htm`, {
            type,
            date
        });
        if (this.state.list.length && date) {
            this.setState(preState => ({
                list: preState.list.concat(result.newsList),
                onLoading: false,
                showFoot: 0
            }));
        } else {
            this.setState({
                list: result.newsList,
                onLoading: false,
                showFoot: 2
            });
        }
    }

    _onRefresh() {
        this.getNewsInfo(0);
    }

    _onEndReached() {
        const time = this.state.list.length
            ? this.state.list[this.state.list.length - 1].date
            : '';
        if (time) {
            this.getNewsInfo(0, time);
        }
        this.setState({
            showFoot: 2
        });
    }

    _extraUniqueKey(item, index) { return `index${index}${item}`; }

    render() {
        const data = this.state.list;
        return this.state.onLoading ? this.renderLoadingView()
            : (
                <View style={financeStyle.oilBg}>
                    <FlatList
                        data={data}
                        style={financeStyle.FlatView}
                        renderItem={this.renderRow}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        onLoading={this.state.onLoading}
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={0.05}
                        keyExtractor={this._extraUniqueKey}
                        ListFooterComponent={this._renderFooter.bind(this)}
                    />
                </View>
            );
    }

    renderRow = (item) => {
        const img = item.item.thumb;
        return (
            <View style={financeStyle.weekBar} idx={item.index}>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#e6e6e6"
                    style={{ width: '100%' }}
                    onPress={() => {
                        this.props.navigation.navigate('NoticeDetails', item.item.id);
                    }}
                >
                    <View style={financeStyle.oilContainer}>
                        <View style={financeStyle.oilItemView}>
                            <Text style={financeStyle.oilText1}>
                                {item.item.title}
                            </Text>
                            <View style={financeStyle.oilTxCont}>
                                <Text style={financeStyle.oilText2}>
                                    {item.item.date}
                                </Text>
                                <Text style={financeStyle.oilText3}>...</Text>
                            </View>
                        </View>
                        {img ? (
                            <Image
                                source={{ uri: img }}
                                style={financeStyle.oilImageView}
                            />
                        ) : (
                            <Image
                                style={financeStyle.oilImageView}
                                source={IMG}
                            />
                        ) }
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
                >
                    <Text style={{
                        color: '#999999',
                        fontSize: 14,
                        marginTop: 5,
                        marginBottom: 5
                    }}
                    >
                        没有更多数据了

                    </Text>
                </View>
            );
        } if (this.state.showFoot === 2) {
            return (
                <View style={financeStyle.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } if (this.state.showFoot === 0) {
            return (
                <View style={financeStyle.footer}>
                    <Text />
                </View>
            );
        }
    }
}

export default Oil;

const financeStyle = StyleSheet.create({
    FlatView: {
        marginLeft: 10,
        marginTop: 10
    },
    oilBg: {
        backgroundColor: 'white'
    },
    weekBar: {
        height: 135,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        marginHorizontal: 10,
        borderColor: '#e1e1e1'
    },
    oilContainer: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18
    },
    oilItemView: {
        marginTop: 10,
        width: '60%',
        // alignContent: 'center',
    },
    oilImageView: {
        height: 95,
        width: 135,
    },
    oilText1: {
        fontWeight: 'bold',
        fontSize: 17
    },
    oilTxCont: {
        flexDirection: 'row'
    },
    oilText2: {
        fontSize: 15,
        marginTop: 10,
        color: '#999'
    },
    oilText3: {
        fontSize: 15,
        marginTop: 10,
        color: '#999',
        marginLeft: 50
    },
    LoadingCon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    conditionText: {
        width: 110,
        textAlign: 'center',
        borderWidth: 1,
    },
    contentText: {
        marginTop: 5,
        color: '#8F8E94',
    },
    rightBottomView: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    beforeValue: {},
    preValue: {},
    actualValue: {}
});
