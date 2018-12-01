import React, { Component } from 'react';
/**
 *JsonUitl的实现
 */
class JsonUtils extends React.Component {
    /**
     *字符串转json
     *
     */
    static stringToJson(data) {
        return JSON.parse(data);
    }

    /**
     *json转字符串
     */
    static jsonToString(data) {
        return JSON.stringify(data);
    }

    /**
     *map转换为json
     */
    static mapToJson(map) {
        return JSON.stringify(JsonUtils.strMapToObj(map));
    }

    /**
     *json转换为map
     */
    static jsonToMap(jsonStr) {
        return JsonUtils.objToStrMap(JSON.parse(jsonStr));
    }


    /**
     *map转化为对象（map所有键都是字符串，可以将其转换为对象）
     */
    static strMapToObj(strMap) {
        const obj = Object.create(null);
        for (const [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    /**
     *对象转换为Map
     */
    static objToStrMap(obj) {
        const strMap = new Map();
        for (const k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }
}

module.exports = JsonUtils;
