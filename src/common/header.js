// import React, { Component } from 'react';
//
// import {
//     View,
//     Text,
//     TouchableHighlight,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     AsyncStorage
// } from 'react-native';
//
// import Icons from 'react-native-vector-icons/Ionicons';
// // import { lang } from '../../lang';
// import { Cache, Contracts, Schedule } from '../../module';
//
// import { isIphoneX, RATIO, SCREEN_WIDTH } from '../../lib/adjust';
// import Tradeheaderstyles from '../../style/trade/header';
// import commonStyles from '../../style/variable';
//
// export default class Header extends Component {
//     render() {
//         if (isIphoneX()) {
//             return (
//                 <View style={Tradeheaderstyles.container}>
//                     <View style={Tradeheaderstyles.body}>
//                         <Icons
//                             name="ios-arrow-back"
//                             style={[Tradeheaderstyles.back, { color: '#fff' }]}
//                             onPress={() => {
//                                 this.props.navigation.goBack();
//                                 this.props.onPress(true);
//                             }}
//                         />
//                         <View style={Tradeheaderstyles.headerRoot}>
//                             <TouchableHighlight onPress={() => { this.props.onPress(); }}>
//                                 <View style={commonStyles.rowStyle}>
//                                     <View>
//                                         <Text style={Tradeheaderstyles.switchBtn}>
//                                             {this.props.commodity === ''
//                                                 ? this.props.commodity
//                                                 : Contracts.total[this.props.commodity].name
//                                             }
//                                         </Text>
//                                         <Text style={{ alignSelf: 'center', color: '#F7C5B6' }}>
//                                             {this.props.commodity === ''
//                                                 ? this.props.commodity
//                                                 : Contracts.total[this.props.commodity].contract
//                                             }
//                                         </Text>
//                                     </View>
//                                     <View style={[Tradeheaderstyles.triangle]} />
//                                 </View>
//                             </TouchableHighlight>
//                         </View>
//                         <Icons
//                             name="ios-list-box-outline"
//                             style={Tradeheaderstyles.listIcon}
//                             onPress={() => {
//                                 this.props.navigation.navigate('Rule',
//                                     { contract: Contracts.total[this.props.commodity].code });
//                             }}
//                         />
//                         <View style={Tradeheaderstyles.listIcon}>
//                             <TouchableOpacity
//                                 style={Tradeheaderstyles.positionTac}
//                                 onPress={() => {
//                                     this.props.navigation.navigate('Position');
//                                 }}
//                             >
//                                 <Text style={{
//                                     color: '#F7C5B6',
//                                     fontWeight: 'bold',
//                                     fontSize: 14 * RATIO
//                                 }}
//                                 >
//                                     持仓
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             );
//         }
//         return (
//             <View style={Tradeheaderstyles.container}>
//                 <View style={commonStyles.heightOffset} />
//                 <View style={Tradeheaderstyles.body}>
//                     <Icons
//                         name="ios-arrow-back"
//                         style={[Tradeheaderstyles.back, { color: '#fff' }]}
//                         onPress={() => {
//                             this.props.navigation.goBack();
//                             this.props.onPress(true);
//                         }}
//                     />
//                     <View style={Tradeheaderstyles.headerRoot}>
//                         <TouchableHighlight onPress={() => { this.props.onPress(); }}>
//                             <View style={commonStyles.rowStyle}>
//                                 <View>
//                                     <Text style={Tradeheaderstyles.switchBtn}>
//                                         {this.props.commodity === ''
//                                             ? this.props.commodity
//                                             : Contracts.total[this.props.commodity].name
//                                         }
//                                     </Text>
//                                     <Text style={{ alignSelf: 'center', color: '#F7C5B6' }}>
//                                         {this.props.commodity === ''
//                                             ? this.props.commodity
//                                             : Contracts.total[this.props.commodity].contract}
//                                     </Text>
//                                 </View>
//                                 <View style={[Tradeheaderstyles.triangle]} />
//                             </View>
//                         </TouchableHighlight>
//                     </View>
//                     <View style={Tradeheaderstyles.listIcon}>
//                         <TouchableOpacity
//                             style={Tradeheaderstyles.positionTac}
//                             onPress={() => {
//                                 if (Cache.isLogin()) {
//                                     this.props.navigation.navigate('Position');
//                                 }
//                                 this.props.navigation.navigate('Position');
//                             }}
//                         >
//                             <Text style={{
//                                 color: '#F7C5B6',
//                                 fontWeight: 'bold',
//                                 fontSize: 14 * RATIO
//                             }}
//                             >
//                                 持仓
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         );
//     }
//
//     forward() {
//         this.props.navigation.navigate('Rules',
//             {
//                 code: Contracts.total[this.props.commodity].code,
//                 contract: this.props.commodity
//             });
//     }
//
//     componentWillUnmount() {
//         Schedule.removeEventListeners(this);
//     }
// }
