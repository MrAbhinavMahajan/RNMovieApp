import ILoggerFactory, {ILogger} from '..';
import DebugLogger from './Logger';

class DebugLoggerFactory implements ILoggerFactory {
  createLogger(): ILogger {
    return new DebugLogger();
  }
}

export default DebugLoggerFactory;
