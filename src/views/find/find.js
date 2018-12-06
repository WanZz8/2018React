import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image, Platform
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
// import { computed } from 'mobx';
import Icons from 'react-native-vector-icons/Ionicons';
import HTML from 'react-native-render-html';
import { formatDate } from '../../utils/tool'; // 全屏宽高
import SafeBody from '../../common/safeView';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height;

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

@inject('NoticeStore')
@observer
class Find extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '公告中心',
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
            fontSize: 18,
            color: '#fff',
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center'
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
            selectedIndex: -1,
        };
    }

    componentDidMount() {
        this.props.NoticeStore.getNoticeContent();
    }

    handleSwitch(key) {
        if (this.state.selectedIndex === key) {
            this.setState({
                selectedIndex: -1
            });
        } else {
            this.setState({
                selectedIndex: key
            });
        }
    }

    render() {
        const content = this.props.NoticeStore.contentList;

        return (
            <SafeAreaView style={FindStyles.root}>
                <ScrollView>
                    <View style={FindStyles.mainContainer}>
                        {content.length ? content.map((item, idx) => {
                            let time = new Date(item.time.time);
                            time = formatDate('y-m-d h:i', { time });
                            if (this.state.selectedIndex === idx) {
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={() => { this.handleSwitch(idx); }}
                                        style={FindStyles.swiperContainer}
                                    >
                                        <View style={{
                                            marginBottom: 10
                                        }}
                                        >
                                            <Text style={{
                                                fontSize: 17
                                            }}
                                            >
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{
                                                color: '#999999'
                                            }}
                                            >
                                                {time}
                                            </Text>
                                            <HTML html={item.content} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            }
                            return (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => { this.handleSwitch(idx); }}
                                    style={FindStyles.swiperContainer}
                                >
                                    <View style={{
                                        marginBottom: 20
                                    }}
                                    >
                                        <Text style={{
                                            fontSize: 17
                                        }}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: '#999999'
                                        }}
                                        >
                                            {time}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }) : <Image />}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const FindStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        backgroundColor: '#F8F7F4'
    },
    mainContainer: {
        width
    },
    swiperContainer: {
        // height: 50,
        width,
        backgroundColor: '#fff',
        marginBottom: 10,
        justifyContent: 'space-around',
        // alignItems: 'center',
        paddingHorizontal: 35,
        paddingVertical: 10

    },
    noticeCon: {
        width,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    IMGPNG: {
        width: 30,
        height: 30
    },
});

export default Find;
