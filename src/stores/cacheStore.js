import { AsyncStorage } from 'react-native';
import { observable, action, computed } from 'mobx';
import { POST, GET } from '../utils/request';
import {
    HOST,
    DOMAIN
} from '../config/baseConfig';

class CacheStore {
    // 0-未登录,1-已登录
    @observable status = false;

    @observable gameBalance = 0;

    @observable jpush = 0;

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
}

const cacheStore = new CacheStore();

export default cacheStore;
