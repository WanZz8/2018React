import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView,
    Clipboard,
    Alert,
    Dimensions,
    StyleSheet
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {
    DOMAIN
} from '../../config/baseConfig';

const inviteFriend = require('./../../img/mine/recommend-bg.jpg');

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height;

class Share extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '推荐好友',
        tabBarIcon: ({ tintColor }) => (
            <Icons name="md-information-circle" size={25} color={tintColor} />
        ),
        headerTitleStyle: {
            alignSelf: 'center', fontSize: 18, color: '#fff', fontWeight: 'bold'
        },
        headerStyle: { height: 35, backgroundColor: '#292929' }
    });

    constructor(props) {
        super(props);
        this.state = {
            linkAddress: `${DOMAIN}/?ru=8413`,
        };
    }

    componentDidMount() {
        //
    }

    async copy() {
        Clipboard.setString(this.state.linkAddress);
        const str = await Clipboard.getString();
        Alert.alert('提示', '复制成功，快去推广吧！');
    }

    render() {
        return (
            <View style={ShareStyles.root}>
                <ScrollView contentContainerStyle={{
                    justifyContent: 'flex-start',
                    paddingBottom: 100,
                    width,
                }}
                >
                    <Image
                        style={{
                            resizeMode: 'stretch',
                            width,
                            height,
                        }}
                        source={inviteFriend}
                    />
                    <View style={{
                        marginTop: 10,
                        height: 20,
                        alignItems: 'center'
                    }}
                    >
                        <View style={{
                            borderColor: '#999999',
                            borderWidth: 1,
                            width: '85%',
                            borderStyle: 'dashed',
                            height: 80,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            // alignItems: 'center',
                            borderRadius: 35,
                            paddingVertical: 15
                        }}
                        >
                            <View>
                                <Text style={{ color: '#6e6e6f', fontSize: 18 }}>
                                    分享您的专属链接
                                </Text>
                                <Text style={{ color: '#6e6e6f', fontSize: 16 }}>
                                    {this.state.linkAddress}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#999999',
                                    borderRadius: 6,
                                    width: 55,
                                    height: 35,
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}
                                onPress={() => {
                                    this.copy();
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 17,
                                        color: '#fff',
                                    }}
                                >
                                    复制

                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const ShareStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        backgroundColor: '#FFF'
    },
    PartTop1: {
        // 上面的分时图
        width,
        flex: 2
    },
    rulesContainer: {
        width,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    timesContainer: {
        height: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    WebViewContainer: {
        flex: 8,
        width,
        alignItems: 'center'
    },
    controContainer: {
        width,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    }
});

export default Share;
