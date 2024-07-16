import ILoggerFactory, {ILogger} from '..';
import InfoLogger from './Logger';

class InfoLoggerFactory implements ILoggerFactory {
  createLogger(): ILogger {
    return new InfoLogger();
  }
}

export default InfoLoggerFactory;
