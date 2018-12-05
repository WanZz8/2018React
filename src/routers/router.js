import React, { Component } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Icons from 'react-native-vector-icons/Ionicons';
import HomePage from '../views/home/home';
import News from '../views/news/news'; // 资讯直播
import NoticeDetails from '../views/news/subpage/noticeDetail'; // 资讯直播
import Sort from '../views/sort/sort'; // 排行榜
import Share from '../views/share/share'; // 推荐好友
import Server from '../views/server/server'; // 在线客服

import TradePage from '../views/trade/trade';
import Rules from '../views/trade/subpage/rules';
import Order from '../views/order/order';
import Position from '../views/position/position';

import Find from '../views/find/find';

import Mine from '../views/mine/mine';
import Login from '../views/login/login';
import Register from '../views/register/register';
import Forget from '../views/forget/forget';
import ChangePassword from '../views/changePassword/changePassword';
import UserInfo from '../views/myUser/myUser';
import MyAccount from '../views/myAccount/myAccount';

import TabBarItem from '../common/tabBarItem';

// TabNavigator
const Tab = TabNavigator(
    {
        Home: {
            screen: HomePage,
            navigationOptions: ({ navigation }) => (
                {
                    tabBarLabel: '首页',
                    tabBarIcon: ({ focused, tintColor }) => (
                        <TabBarItem
                            tintColor={tintColor}
                            focused={focused}
                            selectedImage={require('../img/tab_icons/homeSelect.png')}
                            normalImage={require('../img/tab_icons/home.png')}
                        />
                    )
                }
            )
        },

        Trede: {
            screen: TradePage,
            navigationOptions: ({ navigation }) => (
                {
                    tabBarLabel: '交易',
                    tabBarIcon: ({ focused, tintColor }) => (
                        <Icons
                            name="logo-codepen"
                            size={30}
                            color={tintColor}
                        />
                    )
                }
            )
        },

        Find: {
            screen: Find,
            navigationOptions: ({ navigation }) => (
                {
                    tabBarLabel: '发现',
                    tabBarIcon: ({ focused, tintColor }) => (
                        <Icons
                            name="md-pin"
                            size={30}
                            color={tintColor}
                        />
                    )
                }
            )
        },

        Mine: {
            screen: Mine,
            navigationOptions: ({ navigation }) => (
                {
                    tabBarLabel: '我的',
                    tabBarIcon: ({ focused, tintColor }) => (
                        <TabBarItem
                            tintColor={tintColor}
                            focused={focused}
                            selectedImage={require('../img/tab_icons/mineSelect.png')}
                            normalImage={require('../img/tab_icons/mine.png')}
                        />
                    )
                }
            )
        }
    },
    // tabScreen配置
    {
        tabBarComponent: TabBarBottom, // 自定义
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#AB956D',
            inactiveTintColor: '#979797',
            labelStyle: {
                fontSize: 12, // 文字大小
            },
        }

    }
);


const RootNavigator = StackNavigator(

    {
        Tab: { screen: Tab },
        News: { screen: News },
        NoticeDetails: { screen: NoticeDetails },
        Sort: { screen: Sort },
        Share: { screen: Share },
        Order: { screen: Order },
        Position: { screen: Position },
        Server: { screen: Server },
        Login: { screen: Login },
        Register: { screen: Register },
        Forget: { screen: Forget },
        ChangePassword: { screen: ChangePassword },
        UserInfo: { screen: UserInfo },
        MyAccount: { screen: MyAccount },
        Rules: { screen: Rules },
    },

    {
        navigationOptions: {
            // 开启动画
            animationEnabled: true,
            // 开启边缘触摸返回
            gesturesEnabled: true,
        },
        headerLayoutPreset: 'center',
        mode: 'card',
        transitionConfig: () => ({
            // 统一安卓和苹果页面跳转的动画
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        })
    }
);

export default RootNavigator;
