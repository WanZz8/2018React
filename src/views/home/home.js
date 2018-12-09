import React, { Component } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    StyleSheet,
    Image,
    BackHandler,
    ToastAndroid,
    Dimensions,
    Platform
} from 'react-native';
import Swiper from 'react-native-swiper';
import { observer, inject } from 'mobx-react/native';
import Icons from 'react-native-vector-icons/Ionicons';
import SafeBody from '../../common/safeView';
import Position from './subpage/position';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高
const IMG = {
    banner1: require('../../img/home/banner3.png'),
    banner2: require('../../img/home/banner4.png'),
    IMG1: require('../../img/home/messageLive.png'),
    IMG2: require('../../img/home/sort.png'),
    IMG3: require('../../img/home/recommend.png'),
    IMG4: require('../../img/home/active.png'),
};

@inject('HomeStore', 'MainStore', 'CacheStore')
@observer
class HomePage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false
        };
    }

    componentDidMount() {
        this.props.HomeStore.getNotice();
        setTimeout(() => {
            this.setState({ swiperShow: true });
        }, 0);
    }

    componentWillUnmount() {
        // if (Platform.OS === 'android') {
        //     BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        // }
    }

    sharelink() {
        let data = this.props.CacheStore.isLogin;
        data ? this.props.navigation.navigate(
            'Share'
        ) : Alert.alert('提示', '你还没有登录');
    }

    renderSwiper() {
        if (this.state.swiperShow) {
            return (
                <Swiper
                    autoplay
                    horizontal
                    autoplayTimeout={3}
                    containerStyle={{ width }}
                    removeClippedSubviews={false}
                >
                    <Image
                        source={IMG.banner1}
                        style={HomeStyles.bannerImg}
                    />
                    <Image
                        source={IMG.banner2}
                        style={HomeStyles.bannerImg}
                    />
                </Swiper>
            );
        }
    }

    render() {
        const arr = this.props.HomeStore.noticeAry.slice();
        const params = this.props.MainStore.quoteData.slice();
        const data = this.props.MainStore.TradeLists;
        const { navigation } = this.props;

        return (
            <SafeBody style={HomeStyles.root}>
                <ScrollView style={{ backgroundColor: '#f9f8f5' }}>
                    <View style={HomeStyles.statusBarContainer}>
                        {/* <StatusBar */}
                        {/* animated */}
                        {/* hidden={false} */}
                        {/* backgroundColor="green" */}
                        {/* barStyle="light-content" */}
                        {/* translucent */}
                        {/* /> */}
                        <View style={HomeStyles.swiperContainer}>
                            {this.renderSwiper()}
                        </View>
                    </View>
                    <View style={HomeStyles.scrollContainer}>
                        <View style={HomeStyles.noticeCon}>
                            <View style={HomeStyles.noticeIcon}>
                                <Icons
                                    name="ios-information-circle-outline"
                                    size={25}
                                />
                            </View>
                            <View style={HomeStyles.noticeContent}>
                                {arr.length ? (
                                    <Swiper
                                        autoplay
                                        containerStyle={{ width: '80%' }}
                                        height={50}
                                        removeClippedSubviews={false}
                                        showsPagination={false}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            height: 50
                                        }}
                                        autoplayTimeout={3}
                                    >
                                        { arr.map((item, idx) => (
                                            <Text
                                                key={idx}
                                                style={{
                                                    color: '#939393',
                                                    fontSize: 17,
                                                    height: 50,
                                                    lineHeight: 46
                                                }}
                                            >
                                                {item.title}
                                            </Text>
                                        ))}
                                    </Swiper>
                                ) : (
                                    <Text style={{
                                        color: '#939393',
                                        fontSize: 18,
                                    }}
                                    >
                     暂无公告
                                    </Text>
                                )}
                            </View>
                            <View onPress={() => {}} style={HomeStyles.noticeMore}>
                                <Text style={{
                                    color: '#999',
                                    fontSize: 20,
                                    flex: 0.2,
                                    height: 50,
                                    lineHeight: 46,
                                    left: 2
                                }}
                                >
                     |
                                </Text>
                                <TouchableOpacity onPress={
                                    () => {
                                        this.props.navigation.navigate(
                                            'Find'
                                        );
                                    }}
                                >
                                    <Text style={{
                                        color: '#999',
                                        fontSize: 18,
                                        flex: 2,
                                        right: 2,
                                        height: 50,
                                        lineHeight: 46
                                    }}
                                    >
                     更多
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={HomeStyles.MsgContainer}>
                        <TouchableOpacity
                            style={HomeStyles.MsgBox}
                            onPress={
                                () => {
                                    this.props.navigation.navigate(
                                        'News'
                                    );
                                }}
                        >
                            <Image
                                source={IMG.IMG1}
                                style={HomeStyles.IMGPNG}
                            />
                            <Text>
                     资讯直播
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={HomeStyles.MsgBox}
                            onPress={() => {
                                if (params.length && data.length) {
                                    this.props.navigation.navigate(
                                        'Sort', { params, data }
                                    );
                                }
                            }}
                        >
                            <Image
                                source={IMG.IMG2}
                                style={HomeStyles.IMGPNG}
                            />
                            <Text>
                     排行榜
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={HomeStyles.MsgBox}
                            onPress={() => {
                                this.sharelink();
                            }}
                        >
                            <Image
                                source={IMG.IMG3}
                                style={HomeStyles.IMGPNG}
                            />
                            <Text>
                     推荐好友
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={HomeStyles.MsgBox}
                            onPress={
                                () => {
                                    this.props.navigation.navigate(
                                        'Server'
                                    );
                                }}
                        >
                            <Image
                                source={IMG.IMG4}
                                style={HomeStyles.IMGPNG}
                            />
                            <Text>
                     精彩活动
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* 开市，关市 */}
                    <View style={HomeStyles.positionContainer}>
                        <Position params={params} arr={data} navigation={navigation} />
                    </View>
                </ScrollView>
            </SafeBody>
        );
    }
}

const HomeStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        height,
        backgroundColor: '#ffffff',
    },
    statusBarContainer: {
        // alignItems: 'center'
    },
    mainContainer: {
    },
    swiperContainer: {
        height: 150,
        width
    },
    bannerImg: {
        height: 150,
        width,
    },
    scrollContainer: {
        backgroundColor: '#ffffff',
        width
    },
    noticeCon: {
        width,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    noticeIcon: {
        flex: 1,
        alignItems: 'center'
    },
    noticeContent: {
        flex: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-around'
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
    positionContainer: {}
});

export default HomePage;
