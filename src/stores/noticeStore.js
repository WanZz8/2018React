import { observable, action, computed } from 'mobx';
import { POST, GET } from '../utils/request';
import {
    HOST,
    DOMAIN
} from '../config/baseConfig';

class NoticeStore {
    @observable content;

    time = Date.now()

    constructor() {
        this.content = [];
    }

    @computed get contentList() {
        return this.content.slice();
    }

    @action
    getNoticeContent() {
        if (!this.content.length || Date.now() - this.time > 3600000) {
            GET(`${HOST}/discover/index.htm`).then((res) => {
                if (res.code === 200) {
                    this.content = res.notices;
                }
            });
        }
    }
}

const noticeStore = new NoticeStore();

export default noticeStore;
