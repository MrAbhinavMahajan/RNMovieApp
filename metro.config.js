const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = {};
const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
