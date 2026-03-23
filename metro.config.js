const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 * Reanimated wrapper improves error call stacks (optional but recommended)
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};
const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);

module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
