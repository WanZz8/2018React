import React, { Component, } from 'react';
import {
    BackHandler,
    ToastAndroid,
    Platform,
    NetInfo,
    Alert,
    ImageBackground,
    ActivityIndicator,
    Dimensions,
    Text,
    StyleSheet,
    DeviceEventEmitter,
} from 'react-native';
// import JPushModule from 'jpush-react-native';
import { NavigationActions, } from 'react-navigation';
import { observer, inject } from 'mobx-react/native';
import codePush from 'react-native-code-push';
import Splash from './utils/splash';
import extend from './utils/extend';
// 路由
import RootNavigator from './routers/router';
// import { NavigationActions, } from 'react-navigation';
// import { Toast } from 'teaset';
extend();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IMG = require('./img/loading/loading.jpg');

@codePush
@inject('MainStore', 'CacheStore')
@observer
class AppNavigationState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateText: 'Loading...',
            loading: true,
            isDownload: false,
            isUpdateFinished: false,
            step: 0
        };
        this.process = 0;
        this.lastBackPressed = null;
        this.start = new Date().getTime();
        this.netChange = this.netChange.bind(this);
    }

    componentWillMount() {
        // if (Platform.OS === 'android') {
        //     BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        // }
    }

    componentDidMount() {
        Splash.hide();
        this.sync();
        setTimeout(() => this.loadingText(), 2000);
        this.loadingFinish();
        this.props.MainStore.getData();
        this.props.CacheStore.init();
        // if (Platform.OS === 'android') {
        //     BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        // }
    }

    componentWillUnmount() {
        // if (Platform.OS === 'android') {
        //     this.lastBackPressed = null;
        //     BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        // }
    }

    onBackAndroid = () => {
        const { dispatch } = this.root;
        const { nav } = this.root.state;
        if (nav.index === 0) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            dispatch(NavigationActions.back());
            return true;
        }
    }

    loadingText() {
        const me = this;
        if (this.state.loading) {
            this.setState({
                step: ~me.state.step
            });
        }
    }

    sync() {
        codePush.sync({
            installMode: codePush.InstallMode.IMMEDIATE
        }, this.codePushStatusDidChange.bind(this));
    }

    // 监听更新状态
    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            this.setState({ updateText: '检查更新.' });
            break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ isDownload: true, updateText: '下载更新包.' });
            break;
        case codePush.SyncStatus.AWAITING_USER_ACTION:
            this.setState({ updateText: 'Awaiting user action.' });
            break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ updateText: '正在安装更新.' });
            break;
        case codePush.SyncStatus.UP_TO_DATE:
            this.setState({ updateText: '应用已是最新版本.' }, () => {
                setTimeout(() => this.setState({ isUpdateFinished: true }), 100);
            });
            break;
        case codePush.SyncStatus.UPDATE_IGNORED:
            this.setState({ updateText: 'Update cancelled by user.' });
            break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
            this.setState({ updateText: '更新已安裝,将会在下次启动应用時启用.' },
                () => this.setState({ isUpdateFinished: true }));
            break;
        case codePush.SyncStatus.UNKNOWN_ERROR:
            this.setState({ updateText: '更新失败.' },
                () => this.setState({ isUpdateFinished: true }));
            break;
        default:
        }
    }

    loadingFinish() {
        NetInfo
            .isConnected
            .addEventListener('connectionChange', this.netChange);
        this.process++;

        if (this.state.loading) {
            if (this.process === 2) {
                this.setState({ loading: false });
            }
        }
        if (Platform.OS === 'android') {
            NetInfo
                .isConnected
                .fetch()
                .done((isConnected) => {
                    this.netChange(isConnected);
                });
        }
    }

    netChange(isConnected) {
        if (!isConnected) {
            Alert.alert('警告', '应用需要在连接网络的环境下使用');
            if (!this.state.loading) {
                this.setState({ loading: true });
            }
        }
        if (this.state.loading) {
            if (isConnected) {
                this.process++;
                if (this.process >= 2) {
                    const now = new Date().getTime();
                    const keep = now - this.start;
                    if (keep >= 2000) {
                        this.setState({ loading: false });
                    } else {
                        setTimeout(() => this.setState({ loading: false }), 2000 - keep);
                    }
                }
            }
        }
    }

    render() {
        if (this.state.isUpdateFinished && !this.state.loading && !this.state.isDownload) {
            return (
                <RootNavigator
                    ref={(ref) => {
                        this.root = ref;
                    }}
                />
            );
        }

        return (
            <ImageBackground
                source={IMG}
                style={styles.imageBackground}
            >
                {
                    !this.state.step || !this.state.isUpdateFinished
                        ? <ActivityIndicator style={styles.loading} size="large" />
                        : (
                            <Text style={styles.welcome}>
                                {this.state.updateText}
                            </Text>
                        )
                }
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        width
    },
    loading: {
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        width,
        height
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#fff'
    }
});
// 远程服务器
const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME || codePush.CheckFrequency.ON_APP_START
};
const App = codePush(codePushOptions)(AppNavigationState);

export default App;
