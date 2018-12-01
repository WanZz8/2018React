import React, { Component } from 'react';
import {
    WebView, View, StyleSheet, Dimensions
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { SCREEN_WIDTH, HOST, QUOTE } from '../../../config/baseConfig';
import { GET } from '../../../utils/request';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高

class NoticeDetails extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '资讯详情',
        tabBarIcon: ({ tintColor }) => (
            <Icons name="md-information-circle" size={25} color={tintColor} />
        ),
        headerTitleStyle: {
            alignSelf: 'center', fontSize: 18, color: '#fff', fontWeight: 'bold'
        },
        headerStyle: { height: 35, backgroundColor: '#373737' },
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
