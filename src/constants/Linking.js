export const LINKING_CONFIG = {
  prefixes: ['rn-movie-app://'],
  config: {
    initialRouteName: 'MAIN_TAB',
    screens: {
      MOVIE_DETAILS_SCREEN: 'MOVIE_DETAILS_SCREEN/:payload',
    },
  },
};
