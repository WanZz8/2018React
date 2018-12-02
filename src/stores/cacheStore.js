import { AsyncStorage } from 'react-native';
import { observable, action, computed } from 'mobx';
import JPushModule from 'jpush-react-native';
import { POST, GET } from '../utils/request';
import {
    HOST,
    DOMAIN
} from '../config/baseConfig';

class CacheStore {
    // 0-未登录,1-已登录
    @observable status = false;

    @observable gameBalance = 0;

    @observable jpush = '';

    @observable account = 0;

    @observable password = 0;

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

        const [account, password] = await this.getUserFromCache();

        if (!account || !password) { throw ''; }

        this.account = account;
        this.password = password;
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

    @action
    getUserInfo() {
        GET(`${HOST}/mine/index.htm`).then((res) => {
            console.log(res);
        });
    }

    @action
    resumeLogin() {
        //
    }
}

const cacheStore = new CacheStore();

export default cacheStore;
