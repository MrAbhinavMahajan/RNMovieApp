import {ILogger} from '@constants/AppInterfaces';

class DebugLogger implements ILogger {
  log(message: string) {
    if (__DEV__) {
      console.log('DEBUG: ', message);
    }
  }
}

export default DebugLogger;
