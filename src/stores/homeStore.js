import { observable, action } from 'mobx';
import { POST, GET } from '../utils/request';
import {
    HOST,
    DOMAIN
} from '../config/baseConfig';

class HomeStore {
    // 公告的数组
    @observable noticeAry;

    // 资讯数组
    @observable information;

    constructor() {
        this.noticeAry = [];
        this.information = [];
    }

    @action
    getNotice() {
        GET(`${HOST}/index.htm`, { action: 'carousel' }).then((res) => {
            if (res.code === 200) {
                this.noticeAry = res.notices;
            }
        });
    }
}

const homeStore = new HomeStore();

export default homeStore;
