import { observable, action } from 'mobx';
import { POST, GET } from '../utils/request';
import {
    HOST,
    DOMAIN
} from '../config/baseConfig';

// 行情和持仓

class AssetsStore {
    USD = {
        money: 0
    };


    BTC= {
        money: 0
    };

    ETH={
        money: 0
    };

    USDT= {
        money: 0
    };

    currency= [
        'USD',
        'BTC',
        'ETH',
        'USDT'
    ];

    cryptos = 'ETH,BTC,USDT';

    @observable userId = null;

    @observable username = null;

    @observable loginIp = null;

    @observable initial = null;

    @observable withdrawPW = null;

    @observable money = 0;

    @observable game = 0;

    @action
    update() {
        GET(`${HOST}/mine/index.htm`).then((res) => {
            if (res.code === 200) {
                console.log(res);
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

const assetsStore = new AssetsStore();

export default assetsStore;
