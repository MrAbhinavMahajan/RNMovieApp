import ILoggerFactory, {ILogger} from '..';
import ErrorLogger from './Logger';

class ErrorLoggerFactory implements ILoggerFactory {
  createLogger(): ILogger {
    return new ErrorLogger();
  }
}

export default ErrorLoggerFactory;
