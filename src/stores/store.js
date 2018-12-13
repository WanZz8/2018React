import cacheStore from './cacheStore';
import homeStore from './homeStore';
import mainStore from './mainStore';
import noticeStore from './noticeStore';
import serverStore from './serverStore';
import assetsStore from './assetsStore';

const store = {
    CacheStore: cacheStore,
    HomeStore: homeStore,
    MainStore: mainStore,
    NoticeStore: noticeStore,
    ServerStore: serverStore,
    AssetsStore: assetsStore
};

export default store;
