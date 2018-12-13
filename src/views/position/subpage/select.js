import React, { Component } from 'react';

import {
    FlatList,
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import { Mask } from '../lib/adjust';

import styles from '../style/common/select';
import { Mask } from '../../../utils/adjust';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.show === true) {
            return (
                <Mask>
                    {/* 类似于原生的多选页面 */}
                    <FlatList
                        data={this.props.data}
                        renderItem={({ item }) => (
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.onPress({ name: item.name, value: item.value });
                                }}
                                style={styles.touchable}
                            >
                                <View style={styles.textRoot}>
                                    <Text style={styles.text}>
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        C
                    />
                </Mask>
            );
        }
        return null;
    }
}


const style = StyleSheet.create({
    touchable: {
        height: 50,
        flex: 1
    },
    textRoot: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    text: {
        color: '#d52700',
        lineHeight: 50,
        paddingLeft: 20
    }
});
