import {ILogger} from '@constants/AppInterfaces';

class InfoLogger implements ILogger {
  log(message: string) {
    if (__DEV__) {
      console.log('INFO: ', message);
    }
  }
}
export default InfoLogger;
