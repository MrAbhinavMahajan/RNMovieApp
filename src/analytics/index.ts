import DebugLoggerFactory from './debug/Factory';
import ErrorLoggerFactory from './error/Factory';
import EventLoggerFactory from './event/Factory';
import InfoLoggerFactory from './info/Factory';

export const logDebug = (message: string) => {
  const loggerFactory = new DebugLoggerFactory();
  const logger = loggerFactory.createLogger();
  logger.log(message);
};

export const logInfo = (message: string) => {
  const loggerFactory = new InfoLoggerFactory();
  const logger = loggerFactory.createLogger();
  logger.log(message);
};

export const logError = (message: string) => {
  const loggerFactory = new ErrorLoggerFactory();
  const logger = loggerFactory.createLogger();
  logger.log(message);
};

export const logEvent = (message: string) => {
  const loggerFactory = new EventLoggerFactory();
  const logger = loggerFactory.createLogger();
  logger.log(message);
};

export const onPageViewEvent = () => {};

export const onPageLeaveEvent = () => {};

export const onWidgetViewEvent = () => {};

export const onWidgetLeaveEvent = () => {};
