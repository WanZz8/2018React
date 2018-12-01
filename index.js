/** @format */

import {AppRegistry, YellowBox} from 'react-native';
import {name as appName} from './app.json';
import Root from "./src/App";

AppRegistry.registerComponent(appName, () => Root);
console.disableYellowBox = true;
