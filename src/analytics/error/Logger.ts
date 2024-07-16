import {ILogger} from '..';

class ErrorLogger implements ILogger {
  log(message: string) {
    console.log('ERROR: ', message);
  }
}

export default ErrorLogger;
