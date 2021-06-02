import {AppRegistry} from 'react-native';
import App from './src/App';
import storage from './src/storage'

global.storage = storage;

AppRegistry.registerComponent('qatar', () => App);
