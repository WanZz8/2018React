/* eslint-disable camelcase */ // 允许用下划线表示变量
import {
    AsyncStorage
} from 'react-native';

import zh_cn from './i18n/zh-CN';
import zh_hant from './i18n/zh-hant';
import ja from './i18n/ja';
import ko from './i18n/ko';
import id from './i18n/id';
import java from './i18n/java';

import {
    DefaultLanguage
} from '../config/baseConfig';

import { Schedule } from '../module';

const language = [
    {
        name: '简体中文',
        value: 'zh_cn',
        des: 'Chinese,Simplified'
    },
    {
        name: 'English',
        value: 'en',
        des: 'English'
    },
    // {
    //     name: '繁體中文',
    //     value: 'zh_hant',
    //     des: 'Chinese,Traditional'
    // },
    // {
    //     name: '日文',
    //     value: 'ja',
    //     des: 'japanese'
    // },
    // {
    //     name: '한국어',
    //     value: 'ko',
    //     des: 'Korean'
    // },
    // {
    //     name: 'Indonesian',
    //     value: 'id',
    //     des: 'Bahasa Indonesian'
    // },
    // {
    //     name: 'Javanesse',
    //     value: 'java',
    //     des: 'Javanesse'
    // }
];

const map = {
    zh_cn,
    zh_hant,
    ja,
    ko,
    id,
    java
};

let set = DefaultLanguage;

export function lang(key) {
    if (map[set] !== undefined) {
        return map[set][key];
    }
    return key;
}

export function getCurrentlyLanguage() {
    return language.find(({ value }) => value === set);
}

export function currentLanguage() {
    return set;
}

export function setLanguage(key) {
    set = key;
    Schedule.dispatchEvent({ event: 'updateLanguage' });
    AsyncStorage.setItem('lang', key);
}

export async function getLanguage() {
    try {
        const lang = await AsyncStorage.getItem('lang');
        if (lang !== null) {
            set = lang;
            Schedule.dispatchEvent({ event: 'updateLanguage' });
        } else {
            Schedule.dispatchEvent({ event: 'loadLanguage' });
        }
    } catch (err) {
        Schedule.dispatchEvent({ event: 'loadLanguage' });
    }
}

export function getAvailableLanguage() {
    return language;
}
