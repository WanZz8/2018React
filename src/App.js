import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    YellowBox,
} from 'react-native';

// 全局注册并注入mobx
import { Provider } from 'mobx-react';
// store
import Store from './stores/store';
// 路由
import AppNavigationState from './AppNavigationState';

YellowBox.ignoreWarnings(['Remote debugger',
    'Warning: isMounted(...) is deprecated in plain JavaScript React classes.',
    'Module RCTImageLoader requires main queue setup since it overrides `init` ',
    'Required dispatch_sync to load constants for RNDeviceInfo. This may lead to deadlocks',
    'react-devtools agent got no connection']);

// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//     android:
//     'Double tap R on your keyboard to reload,\n'
//     + 'Shake or press menu button for dev menu',
// });

const Root = () => (
    <Provider {...Store}>
        <AppNavigationState />
    </Provider>
);


export default Root;
