import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    Alert,
    View,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';
import { SCREEN_WIDTH, HOST, QUOTE } from '../../../config/baseConfig';
import { POST, GET } from '../../../utils/request';

const X_WIDTH = 375;
const RATIO = SCREEN_WIDTH / X_WIDTH;

class MsgLive extends Component {
    constructor(props) {
        super(props);
        this.config = {
            pageNo: 1,
            totalPage: 1,
        };
        this.state = {
            list: [],
            onLoading: false,
            refreshing: false,
            showArr: [true],
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2：显示加载中
        };
        this.renderLoadingView = this.renderLoadingView.bind(this);
    }

    componentDidMount() {
        this.fetchData(1);
    }

    _onRefresh() {
        this.config.pageNo = 1;
        this.fetchData(1);
    }

    renderLoadingView() {
        return (
            <View style={liveInformationStyle.container}>
                <ActivityIndicator
                    animating
                    color="red"
                    size="large"
                />
            </View>
        );
    }

    _extraUniqueKey(item, index) { return `index${index}${item}`; }


    renderRow(item) {
        const spliceResult = item.item.split('#');
        let obj = null;
        if (spliceResult.length === 12) {
            obj = {
                date: spliceResult[2],
                title: spliceResult[3].indexOf('【')
                !== -1 || spliceResult[3].indexOf('】') !== -1
                    ? spliceResult[3].split('【')[1].split('】')[0] : '实事热点',
                id: spliceResult[spliceResult.length - 1]
            };
        } else if (spliceResult.length === 14) {
            obj = {
                date: spliceResult[8],
                title: spliceResult[2].indexOf('【')
                !== -1 || spliceResult[2].indexOf('】') !== -1
                    ? spliceResult[2].split('【')[1].split('】')[0] : '实事热点',
                id: spliceResult[spliceResult.length - 2]
            };
        }
        let content = spliceResult[3].indexOf('【')
        !== -1 || spliceResult[3].indexOf('】') !== -1
            ? spliceResult[3].split('【')[1].split('】')[1] : spliceResult[3];
        const reg = /<\/?.+?>/g;
        content = content.replace(reg, '');

        return (
            <View key={item.index}>
                <TouchableHighlight
                    onPress={() => {
                        this.handleSwitch(item.index);
                    }}
                    activeOpacity={1}
                    underlayColor="#e6e6e6"
                >
                    <View>
                        <View style={liveInformationStyle.titleView}>
                            <Text style={liveInformationStyle.titleText}>
                                {obj.title}
                            </Text>
                            {!this.state.showArr[item.index]
                                ? (
                                    <Icons
                                        name="ios-arrow-down"
                                        size={20}
                                        style={[liveInformationStyle.backIcon,
                                            liveInformationStyle.arrorDown]}
                                    />
                                )
                                : <Text style={liveInformationStyle.arrorDown} />}
                        </View>
                        <View style={liveInformationStyle.titleView}>
                            <Text style={liveInformationStyle.titleTime}>
                                {obj.date}
                            </Text>
                        </View>
                        <View style={liveInformationStyle.contentView}>
                            <Text
                                style={[liveInformationStyle.infomationTxt3,
                                    this.state.showArr[item.index]
                                        ? { height: 20 } : '']}
                            >
                                {this.state.showArr[item.index]
                                    ? `${content.substr(0, 18)}...` : content}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return this.state.onLoading ? this.renderLoadingView()
            : (
                <View style={liveInformationStyle.bgView}>
                    <FlatList
                        style={liveInformationStyle.listView}
                        data={this.state.list}
                        renderItem={item => this.renderRow(item)}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        onLoading={this.state.onLoading}
                        keyExtractor={this._extraUniqueKey}
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={0.05}
                        ListFooterComponent={this._renderFooter.bind(this)}
                    />
                </View>
            );
    }

    handleSwitch(key) {
        let arr = this.state.showArr;
        if (arr[key]) {
            arr[key] = false;
            this.setState({
                showArr: arr
            });
        } else {
            arr = [];
            arr[key] = true;
            this.setState({
                showArr: arr
            });
        }
    }

    async fetchData(pageNo) {
        try {
            const result = await GET({
                url: `${HOST}/news/expressList.htm`,
                data: {
                    page: pageNo,
                    size: 25,
                }
            });
            if (this.state.list.length > 1 && this.config.pageNo !== 1) {
                this.setState(preState => ({
                    list: preState.list.concat(result.newsList),
                    onLoading: false,
                    showFoot: 0,
                }));
                this.config.pageNo += 1;
            } else {
                const maxPage = Math.ceil(result.newsList.length / 15);
                this.config.totalPage = maxPage;
                this.config.pageNo = 2;

                this.setState({
                    list: result.newsList,
                    onLoading: false,
                });
            }
        } catch (err) {
            Alert.alert('提示', err.errorMsg || err);
        }
    }

    _onEndReached() {
        if ((this.config.pageNo !== 1)
            && (this.config.pageNo
                >= this.config.totalPage)) {
            return;
        }

        if (this.config.pageNo !== 1) {
            this.fetchData(this.config.pageNo);
        }
        this.setState({
            showFoot: 2,
        });
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
                <View style={liveInformationStyle.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } if (this.state.showFoot === 0) {
            return (
                <View style={liveInformationStyle.footer}>
                    <Text />
                </View>
            );
        }
    }
}

export default MsgLive;

const liveInformationStyle = StyleSheet.create({
    bgView: {
        backgroundColor: '#fff',
        flex: 1,
    },
    listView: {
        marginLeft: 10,
        marginTop: 10,
    },
    container: {
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
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
    },
    redpot: {
        backgroundColor: 'red',
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    redline: {
        backgroundColor: 'white',
        width: 5,
        height: 1.5,
    },
    titleText: {
        // backgroundColor:'#ffe6e5',
        padding: 5,
        borderRadius: 4,
        overflow: 'hidden',
        color: '#1A2025',
        fontSize: 14 * RATIO,
        flex: 5
    },
    titleTime: {
        color: '#939DC0',
        padding: 5,
        borderRadius: 4,
        overflow: 'hidden'
    },
    contentView: {
        marginLeft: 10,
        marginRight: 15,
        paddingVertical: 10
    },
    contentText: {
        color: '#9a99a8',
        fontSize: 15 * RATIO
    },
    liduo: {
        borderColor: '#E84209',
        color: '#E84209',
        borderWidth: 1,
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        maxWidth: 50
    },
    likong: {
        borderColor: '#009900',
        color: '#009900',
        borderWidth: 1,
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
        maxWidth: 50
    },
    dateRoot: {
        width: 80,
        height: 26,
        left: 10,
        backgroundColor: '#e1e1e1',
        justifyContent: 'center'
    },
    dateText: {
        color: '#8F8E94',
        alignSelf: 'center'
    },
    backIcon: {
        color: '#CD3A3C'
    },
    arrorDown: {
        flex: 1,
    },
    infomationTxt3: {
        color: '#9a99a8',
        fontSize: 16
    },
});
