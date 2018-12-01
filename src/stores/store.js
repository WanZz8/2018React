import cacheStore from './cacheStore';
import homeStore from './homeStore';
import mainStore from './mainStore';
import noticeStore from './noticeStore';
import serverStore from './serverStore';

const store = {
    CacheStore: cacheStore,
    HomeStore: homeStore,
    MainStore: mainStore,
    NoticeStore: noticeStore,
    ServerStore: serverStore
};

export default store;
