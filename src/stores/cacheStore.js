import { AsyncStorage, Alert } from 'react-native';
import { observable, action, computed } from 'mobx';
import JPushModule from 'jpush-react-native';
import { POST, GET } from '../utils/request';
import {
    HOST,
    DOMAIN, QUOTE
} from '../config/baseConfig';

class CacheStore {
    @observable username = null;

    @observable loginIp = null;

    @observable withdrawPW = null;

    @observable money = 0;

    @observable game = 0;

    // 0-未登录,1-已登录
    @observable status = false;

    @observable gameBalance = 14883;

    @observable jpush = '';

    @observable account = '';

    @observable password = '';

    @observable phone = 0;

    @observable nickname = 0;

    @observable userId = 0;

    @observable initial = false;

    @observable total = {};

    constructor() {
        this.status = false;
    }

    @computed get isLogin() {
        // console.log(this.status);
        return this.status;
    }

    @computed get GameBalance() {
        return this.gameBalance;
    }

    @computed get totalScheme() {
        return this.total;
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

        this.getBank();

        const account = await AsyncStorage.getItem('account');
        const password = await AsyncStorage.getItem('password');

        // console.log(account);
        // console.log(password);

        if (!account || !password) { throw ''; }
        this.getUserInfo();
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
        let result = await GET(`${HOST}/mine/index.htm`);
        this.setRes(result);
    }

    @action
    async getScheme() {
        if (this.initial) return;
        let str = '';
        str = '?';
        const data = {
            schemeSort: 0,
            tradeType: 1,
            beginTime: '',
            _: new Date().getTime()
        };
        for (const [n, v] of Object.entries(data)) {
            str += `${n}=${v}&`;
        }
        let url = '/trade/scheme.htm';
        let result = await GET(`${HOST}${url}${str}`);
        if (!!result && result.tradeList.length > 0) {
            for (const o of result.tradeList) {
                this.total[o.contCode] = o;
            }
            this.initial = true;
        }
        // console.log(result);
        // console.log(this.total);
    }

    @action
    setRes(res) {
        if (res && res.code === 200) {
            if (res && res.user && res.asset) {
                this.username = res.user.username;
                this.userId = res.user.id;
                this.realBalance = res.asset.money;
                this.gameBalance = res.asset.game;
                this.hello = res.hello;
            }
        }
    }

    @action
    async getBank() {
        // console.log(3);
        await GET(`${HOST}/mine/profile.htm`).then((data) => {
            // console.log(data);
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

    @action
    update() {
        GET(`${HOST}/mine/index.htm`).then((res) => {
            if (res.code === 200) {
                if (res.asset) {
                    this.money = res.asset.money;
                    this.game = res.asset.game;
                }
                if (res.user) {
                    const {
                        id, loginIp, username, withdrawPw
                    } = res.user;
                    this.userId = id;
                    this.loginIp = loginIp;
                    this.username = username;
                    this.withdrawPW = withdrawPw;
                }
            }
        });
    }

    @action
    reset() {
        for (const o of this.currency) {
            this[o].money = 0;
        }
        this.userId = null;
        this.username = null;
        this.loginIp = null;
        this.withdrawPW = null;
    }
}

const cacheStore = new CacheStore();

export default cacheStore;
