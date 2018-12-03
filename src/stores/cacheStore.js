import { AsyncStorage } from 'react-native';
import { observable, action, computed } from 'mobx';
import JPushModule from 'jpush-react-native';
import { POST, GET } from '../utils/request';
import {
    HOST,
    DOMAIN, QUOTE
} from '../config/baseConfig';

class CacheStore {
    // 0-未登录,1-已登录
    @observable status = false;

    @observable gameBalance = 0;

    @observable jpush = '';

    @observable account = '';

    @observable password = '';

    @observable phone = 0;

    @observable nickname = 0;

    @observable userId = 0;

    constructor() {
        this.status = false;
    }

    @computed get isLogin() {
        return this.status;
    }

    @action
    async init() {
        this.jpush = await AsyncStorage.getItem('jpush');
        if (!this.jpush) {
            // 获取注册成功后的registrationId
            JPushModule.getRegistrationID((registrationId) => {
                this.jpush = registrationId;
                AsyncStorage.setItem('jpush', registrationId);
            });
        }
        this.getUserInfo();

        this.getBank();

        const account = await AsyncStorage.getItem('account');
        const password = await AsyncStorage.getItem('password');

        console.log(account);
        console.log(password);

        if (!account || !password) { throw ''; }

        this.account = account;
        this.password = password;

        const result = await this.resumeLogin();
    }

    @action
    async getUserFromCache() {
        const account = await AsyncStorage.getItem('account');
        const password = await AsyncStorage.getItem('password');
        return new Promise((resolve, reject) => {
            resolve([account, password]);
        });
    }


    @action
    async getUserInfo() {
        console.log(2);
        await GET(`${HOST}/mine/index.htm`).then((data) => {
            console.log(data);
            this.username = data.user.username;
            this.userId = data.user.id;
            this.realBalance = data.asset.money;
            this.gameBalance = data.asset.game;
            this.hello = data.hello;
        });
    }

    @action
    async getBank() {
        console.log(3);
        await GET(`${HOST}/mine/profile.htm`).then((data) => {
            console.log(data);
            this.bankCardCount = data.bankCardCount;
            this.realName = data.info.name;
            this.phone = data.info.mobile;
            this.idNumber = data.info.identityNumber;
            this.nickname = data.user.username;
            this.idNumberValid = data.info.identityNumberValid;
            this.withdrawPass = data.user.withdrawPw;
            this.userLevel = data.level;
        });
    }

    @action
    setLogin(account, password) {
        AsyncStorage.setItem('account', account);
        AsyncStorage.setItem('password', password);
        this.status = 1;
    }

    @action
    setLogout() {
        AsyncStorage.removeItem('account');
        AsyncStorage.removeItem('password');
        this.status = 0;
    }

    @action
    login(data) {
        let str = '?';
        if (data) {
            for (const [n, v] of Object.entries(data)) {
                str += `${n}=${v}&`;
            }
        }
        POST(`${HOST}/sso/user_login_check${str}`, {
            method: 'POST',
            mode: 'cors',
        });
    }

    // @action
    // getUserInfo() {
    //     GET(`${HOST}/mine/index.htm`).then((res) => {
    //         console.log(res);
    //     });
    // }

    @action
    resumeLogin() {
        return POST(`${HOST}/sso/user_login_check`, {
            mobile: this.account,
            password: this.password,
            jpush: this.jpush
        });

        // 拿行情数据
        // const res = await fetch(`${QUOTE}${url}${str}`, {
        //     method: 'POST'
        // });
    }

    @action
    addSimBalance() {
        return GET(`${HOST}/trade/addScore.htm`);
    }
}

const cacheStore = new CacheStore();

export default cacheStore;
