import {ILogger} from '../ILoggerFactory.ts';

class DebugLogger implements ILogger {
  log(message: string) {
    if (__DEV__) {
      console.log('DEBUG: ', message);
    }
  }
}

export default DebugLogger;
