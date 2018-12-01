// 集中存放的数据  contracts.js
import {
    observable, action, computed
} from 'mobx';
import { AsyncStorage } from 'react-native';
import { POST, GET } from '../utils/request';
import JsonUtils from '../utils/jsonUtils';
import rest from '../utils/Rest';
import { HOST, QUOTE } from '../config/baseConfig';

class MainStore {
    @observable initial = false;

    @observable quoteList;

    @observable digital = {};

    digitalArray = [];

    @observable foreign = {};

    foreignArray = [];

    @observable domestic = {};

    domesticArray = [];

    @observable stock = {};

    stockArray = [];

    total = {};

    totalArray =[];

    @observable selfArray = [];

    @observable hot = ['CL', 'IF', 'HSI', 'DAX'];

    @observable new = ['SC', 'NK'];

    digitalBrief = [];

    domesticBrief = [];

    foreignBrief = [];

    stockBrief = [];

    @observable arr = [];

    @observable selfBrief = [];

    Ntotal = {};

    @observable strap = '';

    @observable plan = null;

    @observable interval = 2000;

    constructor() {
        this.quoteList = [];
        // const data = {
        //     digitalArray: this.digitalArray.slice(),
        //     domesticArray: this.domesticArray.slice(),
        //     foreignArray: this.foreignArray.slice(),
        //     stockArray: this.stockArray.slice()
        // };
        // this.TradeStore = new TradeStore(data);
    }

    @computed get quoteData() {
        return this.quoteList;
    }

    @computed get TradeLists() {
        // this.arr.push(
        //     this.foreignBrief,
        //     this.stockBrief,
        //     this.domesticBrief
        // );
        // let obj = Object.assign({}, this.foreignBrief, this.stockBrief, this.domesticBrief);
        // console.log(obj);
        // console.log(this.arr);
        // console.log(this.arr.slice());
        return this.arr.slice();
    }

    isHot(contract) {
        const code = this.total[contract].code;
        return this.hot.includes(code);
    }

    isNew(contract) {
        const code = this.total[contract].code;
        return this.new.includes(code);
    }

    @action setData(data) {
        const {
            digitalCommds, foreignCommds, contracts, stockIndexCommds, domesticCommds
        } = data;

        this.quoteList = JSON.parse(contracts);

        for (const e of digitalCommds) {
            this.digital[e.code] = e;
            this.digitalArray.push(e);
        }

        for (const e of foreignCommds) {
            this.foreign[e.code] = e;
            this.foreignArray.push(e);
        }

        for (const e of stockIndexCommds) {
            this.stock[e.code] = e;
            this.stockArray.push(e);
        }

        for (const e of domesticCommds) {
            this.domestic[e.code] = e;
            this.domesticArray.push(e);
        }

        this.totalArray = [].concat(
            this.digitalArray,
            this.foreignArray,
            this.stockArray,
            this.domesticArray
        );

        // 重新组合数据 塞contract
        for (const [code, obj] of Object.entries(this.digital)) {
            const c = this.quoteList.find(c => c.startsWith(code));
            if (c) {
                obj.contract = c;
                this.total[c] = obj;
            }
        }

        // 重新组合数据 塞contract
        for (const [code, obj] of Object.entries(this.foreign)) {
            const c = this.quoteList.find(c => c.startsWith(code));
            if (c) {
                obj.contract = c;
                this.total[c] = obj;
            }
        }

        // 重新组合数据 塞contract
        for (const [code, obj] of Object.entries(this.stock)) {
            const c = this.quoteList.find(c => c.startsWith(code));
            if (c) {
                obj.contract = c;
                this.total[c] = obj;
            }
        }

        // 重新组合数据 塞contract
        for (const [code, obj] of Object.entries(this.domestic)) {
            const c = this.quoteList.find(c => c.startsWith(code));
            if (c) {
                obj.contract = c;
                this.total[c] = obj;
            }
        }

        this.quoteList = this.totalArray.map(c => c.contract);

        for (const { contract } of this.digitalArray) {
            if (contract) {
                const o = {
                    name: contract, price: null, rate: null, isUp: null, isOpen: ''
                };
                this.digitalBrief.push(o);
                this.Ntotal[contract] = o;
            }
        }

        for (const { contract, name } of this.domesticArray) {
            if (contract) {
                const o = {
                    code: contract, name, price: null, rate: null, isUp: null, isOpen: ''
                };
                this.domesticBrief.push(o);
                this.Ntotal[contract] = o;
            }
        }

        for (const { contract, name } of this.foreignArray) {
            if (contract) {
                const o = {
                    code: contract, name, price: null, rate: null, isUp: null, isOpen: ''
                };
                this.foreignBrief.push(o);
                this.Ntotal[contract] = o;
            }
        }

        for (const { contract, name } of this.stockArray) {
            if (contract) {
                const o = {
                    code: contract, name, price: null, rate: null, isUp: null, isOpen: ''
                };
                this.stockBrief.push(o);
                this.Ntotal[contract] = o;
            }
        }
        //
        // for (const { contract } of this.selfArray) {
        //     this.selfBrief.push(this.total[contract]);
        // }
        this.updateSelf(true);
    }

    @action
    async getData() {
        // 拿总数据
        let data;
        await GET(`${HOST}`).then((res) => {
            data = res;
            this.quoteList = JSON.parse(data.contracts);
            Object.keys(data).length ? this.setData(data) : [];
            this.initial = true;
        });
    }


    @action
    getTrade(params) {
        this.strap = params.join(',');
        let str = ''; const
            data = {
                callback: '?',
                code: this.strap,
                _: new Date().getTime(),
                simple: true
            };
        if (this.strap) {
            str = '?';
            for (const [n, v] of Object.entries(data)) {
                str += `${n}=${v}&`;
            }
        }
        this.getList('/quote.jsp', str);
    }

    @action
    async getList(url, str) {
        // 拿行情数据
        const res = await fetch(`${QUOTE}${url}${str}`, {
            method: 'POST'
        });
        clearTimeout(this.plan);
        let quote;
        if (res.status === 200) {
            let body = await res.text();
            body = body.match(/data:'([\s\S]+)'/);
            if (body !== null && body.length > 0) {
                [, quote] = body;
                if (quote.indexOf(';') !== -1) {
                    quote = quote.split(';');
                    quote = quote.map(e => e.split(','));
                }
                // this.tradeData(quote);
                this.plan = setTimeout(() => { this.tradeData(quote); }, 300);
            } else {
                quote = null;
            }
        }
    }

    @action
    tradeData(data) {
        for (const [name, isUp, price, prev] of data) {
            this.Ntotal[name].price = price;
            this.Ntotal[name].isUp = isUp > 0;
            this.Ntotal[name].rate = (() => {
                if (isUp > 0) {
                    return `+${(((price - prev) / prev) * 100).toFixed(2)}%`;
                }
                return `-${(((prev - price) / price) * 100).toFixed(2)}%`;
            })();
            this.Ntotal[name].isOpen = rest.isOpening(this.total[name]);
        }
        this.arr = this.foreignBrief.concat(this.stockBrief, this.domesticBrief);
    }

    async updateSelf(init) {
        if (AsyncStorage.getItem('self') !== null) {
            const aryStr = await AsyncStorage.getItem('self');
            const ary = JsonUtils.stringToJson(aryStr) || [];
            this.selfArray = [];
            for (const item of this.totalArray) {
                const code = item.contract;
                if (ary.includes(code)) {
                    this.selfArray.push(item);
                }
            }
            if (!init) {
                this.updateSelf();
            }
        }
    }
}

const mainStore = new MainStore();

export default mainStore;
