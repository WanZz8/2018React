// 资讯直播
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
// import { SCREEN_WIDTH } from '../../config/baseConfig';
import MsgLive from './subpage/msgLive';
import Oil from './subpage/oils';
import Gold from './subpage/gold';
// import GoldAndSilver from './goldndSilver/index';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高

class News extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '资讯',
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
