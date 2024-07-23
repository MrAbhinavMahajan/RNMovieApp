module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '~': '.',
          '@apis': './src/apis',
          '@analytics': './src/analytics',
          '@store': './src/store',
          '@service': './src/service',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@libraries': './src/libraries',
          '@components': './src/components',
          '@utilities': './src/utilities',
        },
      },
    ],
  ],
};
