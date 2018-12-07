import { AsyncStorage, Dimensions } from 'react-native';

import {
    // getDeviceLocale,
    getTimezone,
    getBrand,
    getCarrier,
    getIPAddress
} from 'react-native-device-info';
// export const DOMAIN = 'https://fk.xztz88.com/';
export const DOMAIN = 'https://nf.hot7h.com';

const X_WIDTH = 375;
const X_HEIGHT = 812;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const RATIO = SCREEN_WIDTH / X_WIDTH;
// export const HOST = 'http://10.12.179.128/api';
// export const HOST = 'https://fk.xztz88.com/api';
export const HOST = 'https://rx.hot7h.com/api';

// export const QUOTE = 'http://10.12.179.128:8480';
export const QUOTE = 'https://quote.76bao.hk';
// export const QUOTE = 'http://osquote.76bao.hk';

// export const CHART_URL = 'http://localhost:88/index.html';
// export const CHART_URL = 'http://www.miaoletou.com/index.html';

// banner src文件夹下的图片文件名
export const CHANNEL = 'APP';

export const CHART_URL = 'http://www.miaoletou.com/';
// export const CHART_URLmdf = 'http://mdf.lt168168.com';

// export const DefaultLanguage = getDefaultLanguage();

export const HAS_CRYPTO = false;

// browser瀏覽版 standard營運版 simulate模擬版
export const contentVersion = 'simulate';
// ios
// 印尼文 id ID
// 繁体中文 zh Hant
// 简体中文 zh Hans
// 日文 ja JP
// 韩语 ko KR

// Android
// 繁体中文 'zh', 'Hant'
// 日文 'ja', 'JP'
// 韩语 'ko', 'KR'
// 印尼文 'id', 'ID'
// 简体中文 'zh', 'Hans'
// export const [locale, lang] = getDeviceLocale().split('-');

const timeZone = [
    {
        value: 'America/New_York',
        min: -300
    },
    {
        value: 'America/Los_Angeles',
        min: -480
    },
    {
        value: 'America/Chicago',
        min: -360
    },
    {
        value: 'America/Phoenix',
        min: -420
    },
    {
        value: 'America/Argentina/Buenos_Aires',
        min: -180
    },
    {
        value: 'Europe/Moscow',
        min: 180
    },
    {
        value: 'Europe/Athens',
        min: 120
    },
    {
        value: 'Europe/Berlin',
        min: 60
    },
    {
        value: 'Europe/London',
        min: 0
    },
    {
        value: 'Australia/Sydney',
        min: 600
    },
    {
        value: 'Australia/Adelaide',
        min: 570
    },
    {
        value: 'Asia/Almaty',
        min: 360
    },
    {
        value: 'Asia/Tokyo',
        min: 540
    },
    {
        value: 'Asia/Taipei',
        min: 480
    },
    {
        value: 'Asia/Tehran',
        min: 210
    },
    {
        value: 'Asia/Dubai',
        min: 240
    },
    {
        value: 'Asia/Kolkata',
        min: 330
    },
    {
        value: 'Asia/Bangkok',
        min: 420
    },
    {
        value: 'Pacific/Auckland',
        min: 720
    },
    {
        value: 'Pacific/Chatham',
        min: 765
    },
    {
        value: 'Pacific/Fakaofo',
        min: 780
    },
    {
        value: 'Pacific/Honolulu',
        min: -600
    },
    {
        value: 'Asia/Kathmandu',
        min: 345
    },
];
/*
*
America/New_York = UTC-5 -300
America/Los_Angeles = UTC-8 -480
America/Chicago = UTC-6 -360
America/Phoenix = UTC-7 -420
America/Argentina/Buenos_Aires = UTC-3 -180
Europe/Moscow = UTC+3 180
Europe/Athens = UTC+2 120
Europe/Berlin = UTC+1 60
Europe/London = UTC+0
Australia/Sydney = UTC+10 600
Australia/Adelaide = UTC+9:30 570
Australia/ACT
Asia/Almaty = UTC+6 360
Asia/Ashkhabad
Asia/Tokyo = UTC+9 540
Asia/Taipei = UTC+8 480
Asia/Tehran = UTC+3:30 210
Asia/Dubai = UTC+4 240
Asia/Kolkata = UTC+5:30 330
Asia/Bangkok = UTC+7 420
Pacific/Auckland = UTC+12 720
Pacific/Chatham = UTC+12:45 765
Pacific/Fakaofo = UTC+13 780
Pacific/Honolulu = UTC-10 -600
Asia/Kathmandu = UTC+5:45 345
US/Mountain
*
* */
export const GMT = (() => {
    const date = new Date();
    const offset = 0 - date.getTimezoneOffset();
    const tempTimeZone = timeZone;
    tempTimeZone.sort((a, b) => {
        if (a.min > b.min) {
            return 1;
        }
        return -1;
    });
    let result = tempTimeZone.find((value) => {
        if (offset === value.min) {
            return true;
        }
        return false;
    });

    if (!result) {
        result = tempTimeZone.find((value) => {
            if (offset < value.min) {
                return true;
            }
            return false;
        });
    }

    return result.value;
})();

// function getDefaultLanguage() {
//     // const [locale, lang] = getDeviceLocale().split('-');
//     if (locale === 'zh' && lang === 'Hans') {
//         return 'zh_cn';
//     } if (locale === 'zh' && lang === 'Hant') {
//         return 'zh_hant';
//     } if (locale === 'ja') {
//         return 'ja';
//     } if (locale === 'id') {
//         return 'id';
//     } if (locale === 'ko') {
//         return 'ko';
//     }
//
//     return 'zh_cn';// 'en';
// }

export const bankList = [
    {
        name: '工商银行'
    },
    {
        name: '建设银行'
    },
    {
        name: '农业银行'
    },
    {
        name: '招商银行'
    },
    {
        name: '中国银行'
    },
    {
        name: '交通银行'
    },
    {
        name: '邮政储蓄'
    },
    {
        name: '民生银行'
    },
    {
        name: '浦发银行'
    },
    {
        name: '兴业银行'
    },
    {
        name: '华夏银行'
    },
    {
        name: '光大银行'
    },
    {
        name: '广发银行'
    },
    {
        name: '中信银行'
    },
    {
        name: '平安银行'
    },
];
