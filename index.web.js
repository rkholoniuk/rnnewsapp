/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native';
import AppContainer from './src/components/AppContainer'

// Sets up offline caching for all assets (disabled by default)
// You can enable offline caching by changing
// `enableOfflinePlugin` at the top of web/webpack.config.js
if (__OFFLINE__) {
  require('offline-plugin/runtime').install()
}

AppRegistry.registerComponent('ExampleApp', () => AppContainer);
AppRegistry.runApplication('ExampleApp', {
  rootTag: window.document.getElementById('react-root'),
});
