import {ILogger} from '../ILoggerFactory.ts';

class ErrorLogger implements ILogger {
  log(message: string) {
    if (__DEV__) {
      console.error('ERROR: ', message);
    }
  }
}

export default ErrorLogger;
