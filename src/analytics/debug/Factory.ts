import {ILogger, ILoggerFactory} from '@constants/AppInterfaces';
import DebugLogger from './Logger';

class DebugLoggerFactory implements ILoggerFactory {
  private static instance: ILogger;

  createLogger(): ILogger {
    if (!DebugLoggerFactory.instance) {
      DebugLoggerFactory.instance = new DebugLogger();
    }
    return DebugLoggerFactory.instance;
  }
}

export default DebugLoggerFactory;
