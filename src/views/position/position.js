import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions, TouchableOpacity, Platform
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

// import Config, { DOMAIN } from '../../../config';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高

const IMG = require('../../img/404.jpg');

const X_WIDTH = 375;
const RATIO = height / X_WIDTH;

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

// 金银

class Position extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '持仓',
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
            // list: [],
            // refreshing: false,
            // onLoading: false,
            // showFoot: 2, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2：显示加载中
        };
    }

    componentDidMount() {
        // this.getNewsInfo(0);
    }

    render() {
        return (
            <View style={PositionStyle.root}>
                <Image source={IMG} />
                <View>
                    <Text style={PositionStyle.viewTxt}>功能还未开放，敬请期待!</Text>
                </View>
            </View>
        );
    }
}

export default Position;

const PositionStyle = StyleSheet.create({
    root: {
        flex: 1,
        width,
        height,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    imgContainer: {
        resizeMode: 'stretch',
    },
    viewTxt: {
        fontSize: 20
    }
});
