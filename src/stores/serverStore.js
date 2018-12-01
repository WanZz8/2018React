import { observable, action, computed } from 'mobx';
import { POST, GET } from '../utils/request';
import {
    HOST,
    DOMAIN
} from '../config/baseConfig';

class ServerStore {
    @observable content;

    @observable msg;

    time = Date.now()

    constructor() {
        this.content = [];
    }

    @computed get contentList() {
        return this.content.slice();
    }

    @action
    getRequestMessage() {
        GET(`${HOST}/home/kefu.htm`, {
            action: 'more',
            size: 50,
            _: new Date()
        }).then((res) => {
            if (res.code === 200) {
                this.content = res.data;
            }
        });
    }

    @action
    setMessage(msg) {
        POST(`${HOST}/home/kefu.htm`, {
            action: 'send',
            content: msg
        }).then((res) => {
            // console.log(res);
        });
    }
}

const serverStore = new ServerStore();

export default serverStore;
