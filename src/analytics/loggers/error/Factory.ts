import {ILogger, ILoggerFactory} from '@constants/AppInterfaces';
import ErrorLogger from './Logger';

class ErrorLoggerFactory implements ILoggerFactory {
  private static instance: ILogger;

  createLogger(): ILogger {
    if (!ErrorLoggerFactory.instance) {
      ErrorLoggerFactory.instance = new ErrorLogger();
    }
    return ErrorLoggerFactory.instance;
  }
}

export default ErrorLoggerFactory;
