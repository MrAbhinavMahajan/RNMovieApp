class AppEventsTracker {
  log(data: object) {
    if (__DEV__) {
      console.log('[ANALYTICS]', data);
    }
  }
}
export default AppEventsTracker;
