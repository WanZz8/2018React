import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    Platform,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    WebView,
    DeviceEventEmitter
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Icons from 'react-native-vector-icons/Ionicons';
import WKWebView from 'react-native-wkwebview-reborn';
import { formatDate } from '../../utils/tool';
import Header from './subpage/header';
import SafeBody from '../../common/safeView';
import Controller from './subpage/Controller';
import LoadingView from '../../common/LoadingView';
import { CHART_URL } from '../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高
const IMG = require('../../img/login/logo.png');

@inject('MainStore', 'CacheStore')
@observer
class TradePage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            name: '美原油',
            rate: '',
            isOPen: '',
            url: '',
            show: false,
            type: 'time',
            left: 0,
            price: ''
        };
        this.renderWebview = this.renderWebview.bind(this);
    }

    componentWillMount() {
        const arr = this.props.MainStore.TradeLists;
        if (arr && arr.length) {
            this.setState({
                code: arr[0].code,
                name: arr[0].name,
                url: `${CHART_URL}?code=${arr[0].code}`,
                price: arr[0].price,
                rate: arr[0].rate,
                isOpen: arr[0].isOpen
            });
        }
    }

    componentDidMount() {
        this.scription = DeviceEventEmitter.addListener('KeyBack', (data) => {
            this.setState({
                show: data,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            const { data } = nextProps.navigation.state.params;
            this.setState({
                code: data.code,
                name: data.name,
                url: `${CHART_URL}?code=${data.code}`,
                price: data.price,
                rate: data.rate,
                isOpen: data.isOpen
            });
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.url !== prevState.url) {
            this.renderWebview();
        }
    }

    componentWillUnmount() {
        this.scription.remove();
    }

    changeType(type) {
        if (this._chart) {
            if (Platform.OS === 'ios') {
                this._chart.evaluateJavaScript(`this.swap('${type}')`);
            } else {
                this._chart.injectJavaScript(`this.swap('${type}')`);
            }
        }
    }

    getSubTypePosition(px, width) {
        if (this.state.left === 0) {
            if (Platform.OS === 'android') {
                this.setState({ left: (Math.abs(px).sub(91)).sub(width) });
            } else {
                this.setState({ left: px - (61 - width) / 2 });
            }
        }
    }

    refresh() {
        console.log(100);
        // this.setState({
        //     show: true
        // });
    }

    renderLoading = () => <LoadingView />;

    renderWebview() {
        if (Platform.OS === 'ios') {
            return (
                <WKWebView
                    style={{
                        flex: 1,
                        width,
                        height: 500
                    }}
                    source={{ uri: this.state.url }}
                    ref={(c) => { this._chart = c; }}
                    renderLoading={this.renderLoading}
                    onNavigationStateChange={() => {
                        this._chart.evaluateJavaScript('history.back()');
                    }}
                />
            );
        }
        return (
            <WebView
                ref={(c) => { this._chart = c; }}
                source={{ uri: this.state.url }}
                style={{ width }}
                javaScriptEnabled
                scalesPageToFit
                renderLoading={this.renderLoading}
                mixedContentMode="always"
                domStorageEnabled
                onNavigationStateChange={() => {
                    this._chart.injectJavaScript('history.back()');
                }}
            />
        );
    }

    render() {
        let date = new Date().getTime();
        console.log(this.props.CacheStore.isLogin);
        return (
            <SafeBody style={TradeStyles.root}>
                <Header
                    navigation={this.props.navigation}
                    code={this.state.code}
                    name={this.state.name}
                    onPress={() => {}}
                />
                <View style={TradeStyles.PartTop1}>
                    <View style={TradeStyles.rulesContainer}>
                        <View style={{
                            // height: 65,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}
                        >
                            <Text style={{
                                fontSize: 30
                            }}
                            >
                                {this.state.price}
                            </Text>
                            <Text>
                                0.00
                                {this.state.rate}
                            </Text>
                        </View>
                        <View style={{
                            height: 65,
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}
                        >
                            <Text>
                                {this.state.isOPen ? '开市' : '休市'}
                                {/* {formatDate('y-m-d h:i', date)} */}
                            </Text>
                        </View>
                    </View>
                    <View style={TradeStyles.timesContainer}>
                        <TouchableHighlight
                            style={[{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderWidth: 1,
                                borderRadius: 4
                            }, this.state.type === 'time' ? { backgroundColor: '#dfdee4' } : '']}
                            select={this.state.type}
                            position={(px, width) => this.getSubTypePosition(px, width)}
                            activeOpacity={1}
                            underlayColor="#e6e6e6"
                            onPress={() => {
                                this.setState({ type: 'time' });
                                this.changeType('time');
                            }}
                        >
                            <Text>分时</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderWidth: 1,
                                borderRadius: 4
                            }, this.state.type === '1D' ? { backgroundColor: '#dfdee4' } : '']}
                            select={this.state.type}
                            position={(px, width) => this.getSubTypePosition(px, width)}
                            activeOpacity={0.7}
                            underlayColor="#e6e6e6"
                            onPress={() => {
                                this.setState({ type: '1D' });
                                this.changeType('1D');
                            }}
                        >
                            <Text>日线</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderWidth: 1,
                                borderRadius: 4
                            }, this.state.type === '1' ? { backgroundColor: '#dfdee4' } : '']}
                            select={this.state.type}
                            activeOpacity={0.7}
                            underlayColor="#e6e6e6"
                            onPress={() => {
                                this.setState({ type: '1' });
                                this.changeType('1');
                            }}
                        >
                            <Text>1分</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderWidth: 1,
                                borderRadius: 4
                            }, this.state.type === '3' ? { backgroundColor: '#dfdee4' } : '']}
                            select={this.state.type}
                            activeOpacity={0.7}
                            underlayColor="#e6e6e6"
                            onPress={() => {
                                this.setState({ type: '3' });
                                this.changeType('3');
                            }}
                        >
                            <Text>3分</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderWidth: 1,
                                borderRadius: 4
                            }, this.state.type === '5' ? { backgroundColor: '#dfdee4' } : '']}
                            select={this.state.type}
                            activeOpacity={0.7}
                            underlayColor="#e6e6e6"
                            onPress={() => {
                                this.setState({ type: '5' });
                                this.changeType('5');
                            }}
                        >
                            <Text>5分</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderWidth: 1,
                                borderRadius: 4
                            }, this.state.type === '15' ? { backgroundColor: '#dfdee4' } : '']}
                            select={this.state.type}
                            activeOpacity={0.7}
                            underlayColor="#e6e6e6"
                            onPress={() => {
                                this.setState({ type: '15' });
                                this.changeType('15');
                            }}
                        >
                            <Text>15分</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={TradeStyles.WebViewContainer}>
                    {this.renderWebview()}
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#9e9e9e',
                        marginVertical: 15
                    }}
                    />
                </View>
                <Controller
                    navigation={this.props.navigation}
                    refresh={() => { this.refresh(); }}
                    status={this.state.show}
                    code={this.state.code}
                />
            </SafeBody>
        );
    }
}


const TradeStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        backgroundColor: '#FFF'
    },
    PartTop1: {
        // 上面的分时图
        width,
        flex: 2,
        backgroundColor: '#FFF'
    },
    rulesContainer: {
        width,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        flex: 1,
        marginBottom: 5
    },
    timesContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    WebViewContainer: {
        flex: 8,
        width,
        alignItems: 'center',
        backgroundColor: '#FFF'
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

export default TradePage;
