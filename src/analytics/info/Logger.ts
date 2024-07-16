import {ILogger} from '../ILoggerFactory.ts';

class InfoLogger implements ILogger {
  log(message: string) {
    if (__DEV__) {
      console.log('INFO: ', message);
    }
  }
}
export default InfoLogger;
