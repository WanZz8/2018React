import React, { Component } from 'react';
import {
    ScrollView,
    View,
    // TouchableOpacity,
    Text,
    TextInput,
    ImageBackground,
    Image,
    // Platform,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert, Platform
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons'; // 全屏宽高
// import { inject, observer } from 'mobx-react/native';
import {
    CHART_URL,
    QUOTE,
    SCREEN_WIDTH,
    HOST
} from '../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height;
const IMG = require('../../img/server/active.jpg');

const X_WIDTH = 375;
const RATIO = SCREEN_WIDTH / X_WIDTH;
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

class Server extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '精彩活动',
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
            timer: ''
        };
    }

    componentDidMount() {
        // this.sv.scrollToEnd();
    }

    componentWillUnmount() {
        clearTimeout(this.state.timer);
    }

    renderBottomButtons() {
        const selectedStyle = { backgroundColor: '#fff' };
        const unselectStyle = { backgroundColor: '#000' };

        const selectedTextStyle = { color: '#000' };
        const unselectTextStyle = { color: '#9b9b9b' };

        const secondButtonStyle = this.state.selectIndex === 1
            ? selectedStyle : unselectStyle;

        const secondButtonTextStyle = this.state.selectIndex === 1
            ? selectedTextStyle : unselectTextStyle;

        return (
            <View style={{
                width: '100%',
                height: 100,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#000'
            }}
            >
                <Text style={{
                    marginLeft: 10,
                    marginTop: 10
                }}
                >
                    活动项目 共2项
                </Text>
                <View style={{
                    flexDirection: 'row',
                }}
                >
                    <TouchableOpacity
                        onPress={() => {}}
                        style={[{
                            borderWidth: 1,
                            borderColor: '#e1e1e1',
                            flex: 1,
                            margin: 10,
                            paddingVertical: 5
                        },
                        secondButtonStyle]}
                    >
                        <Text style={[{
                            textAlign: 'center'
                        },
                        secondButtonTextStyle]}
                        >
                            {'注册即送\n模拟奖'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={ActiveStyles.root}>
                <ScrollView ref={(sv) => { this.sv = sv; }}>
                    <Image source={IMG} style={{ width, height }} />
                </ScrollView>
                <View>
                    {this.renderBottomButtons()}
                </View>
            </View>
        );
    }
}

export default Server;

const ActiveStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    bgContainer: {
        flex: 1,
        width,
    },
    bottomView: {
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor: '#000'
    },
    bottomInput: {
        padding: 8,
        paddingLeft: 20,
        backgroundColor: '#eeeff0',
        borderRadius: 28,
        flex: 6
    },
    sendIcon: {
        flex: 1,
        color: '#e99388',
        alignSelf: 'center',
        marginLeft: 10
    },
    serverConversationRoot: {
        flexDirection: 'row',
        padding: 15
    },
    serverImage: {
        width: 44,
        height: 44,
        marginRight: 20
    },
    triangleServer: {
        position: 'absolute',
        zIndex: 1,
        left: -15,
        top: 10,
        width: 0,
        height: 0,
        borderLeftWidth: 2,
        borderRightWidth: 10,
        borderTopWidth: 7,
        borderBottomWidth: 7,
        borderLeftColor: 'transparent',
        borderRightColor: '#000',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        alignSelf: 'center',
        marginLeft: 3
    },
    serverTextWrapper: {
        backgroundColor: '#e6e6e6',
        padding: 10,
        maxWidth: 215 * RATIO
    },
    conversationText: {
        fontSize: 16
    },
    userConversationRoot: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'flex-end'
    },
    userTextWrapper: {
        backgroundColor: '#e6e6e6',
        padding: 10,
        maxWidth: 215 * RATIO
    },
    triangleCustomer: {
        position: 'absolute',
        zIndex: 1,
        right: 67,
        top: 23,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 2,
        borderTopWidth: 7,
        borderBottomWidth: 7,
        borderLeftColor: '#000',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        alignSelf: 'center',
        marginLeft: 3
    },
    userImage: {
        width: 44,
        height: 44,
        marginLeft: 20
    },
    mainContainer: {
        width,
        height,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
