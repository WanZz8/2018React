import { NativeModules } from 'react-native';

if (NativeModules.SplashScreen) {
    module.exports = NativeModules.SplashScreen;
} else {
    module.exports = null;
}
