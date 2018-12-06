import React, { Component } from 'react';
import {
    WebView, View, StyleSheet, Dimensions, TouchableOpacity, Platform, Text
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { SCREEN_WIDTH, HOST, QUOTE } from '../../../config/baseConfig';
import { GET } from '../../../utils/request';

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

class NoticeDetails extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '资讯详情',
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
            content: '',
            date: '',
            title: ''
        };
    }

    render() {
        const html = `
            <!DOCTYPE html>
                <html>
                    <head>
                        <meta 
                        name="viewport" 
                        content="width=device-width,
                        initial-scale=1,
                        maximum-scale=1,
                        minimum-scale=1,
                        user-scalable=no"
                        >
                    <head>
                    <body style="margin:0;">
                        <div style="padding:10px">
                            <div>${this.state.title}</div>
                            <div style="color:#8f8e94">${this.state.date}</div>
                        </div>
                        <div style="padding:0 10px">
                            ${this.state.content}
                        </div>
                    <body>
                    <style type="text/css">
                        img {width:100% ! important}
                    </style>
                <html>
            `;

        return (
            <View style={NoticeDetailsStyle.root}>
                <WebView source={{ html }} />
            </View>

        );
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.getDetail(params);
    }

    async getDetail(id) {
        try {
            const result = await GET(`${HOST}/news/newsDetail.htm`,
                {
                    id

                });
            this.setState({
                content: result.news.content,
                date: result.news.date,
                title: result.news.title
            });
        } catch (err) {
            //
        }
    }
}
const NoticeDetailsStyle = StyleSheet.create({
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

export default NoticeDetails;
