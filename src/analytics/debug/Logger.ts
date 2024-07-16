import {ILogger} from '..';

class DebugLogger implements ILogger {
  log(message: string) {
    console.log('DEBUG: ', message);
  }
}

export default DebugLogger;
