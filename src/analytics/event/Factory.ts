import {ILogger, ILoggerFactory} from '@constants/AppInterfaces';
import EventLogger from './Logger';

class EventLoggerFactory implements ILoggerFactory {
  private static instance: ILogger;

  createLogger(): ILogger {
    if (!EventLoggerFactory.instance) {
      EventLoggerFactory.instance = new EventLogger();
    }
    return EventLoggerFactory.instance;
  }
}

export default EventLoggerFactory;
