import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';

// import Config, { DOMAIN } from '../../../config';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高

const IMG = require('../../../img/404.jpg');

const X_WIDTH = 375;
const RATIO = height / X_WIDTH;

// 金银

class Gold extends Component {
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
            <View style={GoldStyle.root}>
                <Image source={IMG} />
                <View>
                    <Text style={GoldStyle.viewTxt}>功能还未开放，敬请期待!</Text>
                </View>
            </View>
        );
    }
}

export default Gold;

const GoldStyle = StyleSheet.create({
    root: {
        flex: 1,
        width,
        alignItems: 'center'
    },
    imgContainer: {
        resizeMode: 'stretch',
    },
    viewTxt: {
        fontSize: 20
    }
});
