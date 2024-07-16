import {ILogger, ILoggerFactory} from '@constants/AppInterfaces';
import InfoLogger from './Logger';

class InfoLoggerFactory implements ILoggerFactory {
  private static instance: ILogger;

  createLogger(): ILogger {
    if (!InfoLoggerFactory.instance) {
      InfoLoggerFactory.instance = new InfoLogger();
    }
    return InfoLoggerFactory.instance;
  }
}

export default InfoLoggerFactory;
