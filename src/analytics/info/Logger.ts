import {ILogger} from '..';

class InfoLogger implements ILogger {
  log(message: string) {
    console.log('INFO: ', message);
  }
}
export default InfoLogger;
