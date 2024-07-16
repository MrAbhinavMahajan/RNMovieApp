import {ILogger} from '@constants/AppInterfaces';

class EventLogger implements ILogger {
  log(message: string) {
    if (__DEV__) {
      console.log('[ANALYTICS]', message);
    }
  }
}
export default EventLogger;
