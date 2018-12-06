// 资讯直播
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions, Platform
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
// import { SCREEN_WIDTH } from '../../config/baseConfig';
import MsgLive from './subpage/msgLive';
import Oil from './subpage/oils';
import Gold from './subpage/gold';
// import GoldAndSilver from './goldndSilver/index';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高
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

class News extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '资讯',
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
            selectedIdx: 1
            // showLive: false,
        };
        this.renderContentView = this.renderContentView.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.setState({
            // showLive: this.props.navigation.state.params
            // && this.props.navigation.state.params.showLive
        });
    }

    renderContentView() {
        const { navigation } = this.props;
        if (this.state.selectedIdx === 1) {
            return <MsgLive />;
        }
        if (this.state.selectedIdx === 2) {
            return <Oil navigation={navigation} />;
        }
        if (this.state.selectedIdx === 3) {
            return <Gold navigation={navigation} />;
        }
    }

    render() {
        return (
            <View style={NewsStyle.root}>
                <View style={NewsStyle.headerBar}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                selectedIdx: 1,
                                // showLive: false
                            });
                        }}
                        >
                            <Text style={{
                                fontSize: this.state.selectedIdx === 1
                                    ? 19 : 16,
                                fontWeight: 'bold',
                            }}
                            >
                                资讯直播

                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    selectedIdx: 2,
                                    // showLive: false
                                });
                            }}
                        >
                            <Text style={{
                                fontSize: this.state.selectedIdx === 2
                                    ? 19 : 16,
                                fontWeight: 'bold',
                            }}
                            >
                                原油

                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    selectedIdx: 3,
                                    // showLive: false
                                });
                            }}
                        >
                            <Text style={{
                                fontSize: this.state.selectedIdx === 3
                                    ? 19 : 16,
                                fontWeight: 'bold',
                            }}
                            >
                                金银

                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.renderContentView()}
            </View>
        );
    }
}

export default News;

const NewsStyle = StyleSheet.create({
    root: {
        flex: 1,
        width,
        backgroundColor: '#fff',
        height
    },
    headerBar: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: '#e99a56',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 45,
        width
    }
});
